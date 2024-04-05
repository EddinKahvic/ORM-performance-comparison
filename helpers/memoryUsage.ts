import * as fs from 'fs/promises'

export class MemoryUsageProvider {
  private _fileName = 'memoryUsages.txt'

  public Start() {
    const start = this.GetMemoryUsage()

    return () => {
      const usageBytes = this.GetMemoryUsage() - start
      const usage = usageBytes

      global.gc?.()

      this.AppendToFile(usage)
    }
  }

  private async AppendToFile(usage: number) {
    await fs.appendFile(this._fileName, `${usage},`)
  }

  public ToMegaBytes(bytes: number) {
    return Math.round((bytes / 1024 / 1024) * 100) / 100
  }

  public async ClearMemoryUsages() {
    await fs.writeFile(this._fileName, '')
  }

  private GetMemoryUsage() {
    return process.memoryUsage().heapUsed
  }

  public async GetMemoryUsages() {
    const fileBuffer = await fs.readFile(this._fileName)
    const usages = fileBuffer.toString().split(',').map(Number).slice(0, -1)

    return usages
  }
}

const MemoryUsage = new MemoryUsageProvider()

export default MemoryUsage
