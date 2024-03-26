import * as fs from 'fs/promises'

export class MemoryUsageProvider {
  private _fileName = 'memoryUsages.txt'

  public Start() {
    const start = this.GetMemoryUsage()

    return () => {
      const usageBytes = this.GetMemoryUsage() - start
      const usage = this.ToMegaBytes(usageBytes)

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
    const usagesPos = usages.filter((n) => n > 0)

    const sumOfPositiveNumbers = usagesPos.reduce((sum, c) => sum + c, 0)
    const averagePos = sumOfPositiveNumbers / usagesPos.length

    const averageAll =
      usages.reduce((sum, current) => sum + current, 0) / usages.length
    console.log('Average all usage:', averageAll)
    console.log('Average pos usage:', averagePos)

    return usages
  }
}

const MemoryUsage = new MemoryUsageProvider()

export default MemoryUsage
