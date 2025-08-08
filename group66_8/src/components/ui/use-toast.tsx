'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

type Toast = {
  id: number
  title: string
  description?: string
  variant?: 'default' | 'destructive'
}

type ToastContextType = {
  toast: (toast: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

let toastCount = 0

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (toast: Omit<Toast, 'id'>) => {
    const id = ++toastCount
    setToasts((prev) => [...prev, { id, ...toast }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 9999,
          maxWidth: 320,
        }}
      >
        {toasts.map(({ id, title, description, variant }) => (
          <div
            key={id}
            style={{
              backgroundColor: variant === 'destructive' ? '#f87171' : '#4ade80',
              color: 'white',
              padding: '12px 16px',
              borderRadius: 8,
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              fontWeight: '600',
            }}
          >
            <div>{title}</div>
            {description && <div style={{ fontWeight: 'normal', marginTop: 4 }}>{description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
