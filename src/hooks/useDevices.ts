/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable @typescript-eslint/no-unused-vars
// @ts-nocheck

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import resolver from '../utils/secure-resolver'

const CONNECTION_STATUS_CONNECTING = 0
const CONNECTION_STATUS_OPEN = 1
const CONNECTION_STATUS_CLOSING = 2
const CONNECTION_STATUS_CLOSED = 3

interface UseDevicesProps {
  host: string | undefined
  query: string
  topic?: string
  useFirst?: boolean
}

export default function useDevices<T>({
  host,
  query,
  topic,
  useFirst = false,
}: UseDevicesProps) {
  const didUnmount = useRef(false)
  const options = useMemo(
    () => ({
      shouldReconnect: () => didUnmount.current === false,
      // share: true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    }),
    [didUnmount]
  )
  const [subscriptions, setSubscriptions] = useState<string[]>([])

  const getSocketUrl = useCallback(
    () =>
      // eslint-disable-next-line no-async-promise-executor
      new Promise(async (resolve, reject) => {
        try {
          const res = await fetch(host as string)
          const data = await res.json()
          const events = data.links.find(link =>
            link.rel.find(rel => rel === 'http://rels.zettajs.io/events')
          ).href
          resolve(resolver(events))
        } catch (err) {
          // reject(err);
        }
      }),
    [host]
  )

  const [error, setError] = useState()
  const [devices, setDevices] = useState<T>([])
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    getSocketUrl,
    options
  )

  // make initial device query
  useEffect(() => {
    if (readyState === 1) {
      const topic = query ? `query/${query}` : '**'
      sendMessage(JSON.stringify({ type: 'subscribe', topic }))
      setSubscriptions([...subscriptions, topic])
    }
  }, [readyState, query, sendMessage])

  function createFormData(formData, key, data) {
    if (data === Object(data) || Array.isArray(data)) {
      for (const i in data) {
        createFormData(formData, `${key}[${i}]`, data[i])
      }
    } else {
      formData.append(key, data)
    }
  }

  function performAction(props: any) {
    return async (action: string, payload: any) => {
      const currentAction = (props.$actions || []).find(a => a.name === action)

      if (!currentAction) {
        console.warn(`No action found for ${action}`)
        return
      }

      const { method, href } = currentAction

      const formData = new FormData()

      // if (payload) {
      //   formData = Object.entries(payload).reduce((acc, [key, value]) => {
      //     acc.append(key, JSON.stringify(value));
      //     return acc;
      //   }, formData);
      // }

      Object.entries({ action, ...payload }).forEach(([key, value]) => {
        const val = typeof value === 'object' ? JSON.stringify(value) : value
        formData.append(key, val)
      })

      const body = new URLSearchParams(formData).toString()

      // const body = Object.entries({ action, ...payload }).reduce(
      //   (acc, [key, value]) => {
      //     `${acc}${key}=${encodeURIComponent(value)}&`,
      //   }
      //   ''
      // );

      try {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), 20000)

        const { properties } = await fetch(resolver(href), {
          method,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          body,
          signal: controller.signal,
        }).then(async res => {
          if (!res.ok) {
            const errorResponse = await res.json()
            const message = errorResponse?.properties?.message || res.statusText
            throw new Error(message)
          }
          return res.json()
        })
        clearTimeout(id)
        // const device = devices.find(device => device.id === properties.id);
        // device.properties = properties;
        // setDevices(devices);
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  }

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data)
      // console.log(data)
      const handlers = {
        error: data => setError(data),
        'subscribe-ack': data => console.log(`subscribed to:`, data),
        event: ({
          subscriptionId,
          topic,
          data,
        }: {
          subscriptionId: number
          topic: string
          data: any
        }) => {
          if (subscriptionId === 1) {
            if (data.properties) {
              data.properties.$actions = data.actions
              data.properties.performAction = performAction(data.properties)
            }

            setDevices(prev => {
              const device = prev.find(item => item.id === data.properties.id)

              if (device) {
                // TODO replace instance with data.properties
                return prev
              }
              return prev.concat(data.properties)
            })

            // const topics = data.links
            //   .filter(link => link.rel.includes('monitor'))
            //   .map(link => {
            //     const [server, topic] = link.href.split('?');
            //     const query = topic.split('=')[1];
            //     return decodeURIComponent(query);
            //   });
            // topics.forEach(topic => {
            // });
            const root = data.links.find(link => link.rel.includes('up')).href
            const { pathname } = new URL(root)
            const server = pathname.split('/')[2]
            const topic = `${server}/${data.properties.type}/${data.properties.id}/*`

            if (!subscriptions.includes(topic)) {
              sendMessage(JSON.stringify({ type: 'subscribe', topic }))
              setSubscriptions([...subscriptions, topic])
            }
          } else {
            const [server, type, id, property] = topic.split('/')

            const device = devices.find(device => device.id === id)
            if (device) {
              device[property] = data
            } else {
              console.error(`No device found for ${id} property : ${property}`)
            }

            setDevices(devices)
          }
        },
      }

      const handler = handlers[data.type]

      if (!handler) {
        console.error(`No handler for ${data.type}`)
      }

      handler(data)
    }
  }, [lastMessage, setDevices, sendMessage, devices])

  useEffect(() => {
    return () => {
      didUnmount.current = true
    }
  }, [])

  const state = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
  }[readyState]

  return [useFirst ? devices[0] || {} : devices, state, error]
}
