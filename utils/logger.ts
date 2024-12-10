type LogLevel = 'info' | 'warn' | 'error'

export const logger = {
  log: (level: LogLevel, message: string, meta?: any) => {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`
    
    switch (level) {
      case 'info':
        console.log(logMessage, meta)
        break
      case 'warn':
        console.warn(logMessage, meta)
        break
      case 'error':
        console.error(logMessage, meta)
        break
    }

    // In a production environment, you would typically send logs to a centralized logging service here
  }
}

