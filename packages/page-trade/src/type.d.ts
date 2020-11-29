
interface NodeNameProps {
  nodeName: string,
  setNodeName?: React.Dispatch<string>
}

interface Candle {
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number
}

interface Fill {
  _id: string,
  blockHeight: number,
  blockHash: string,
  blockTime: number,
  tradingHistoryIdx: number,
  pairId: number,
  price: number,
  maker: string,
  taker: string,
  makerOrderId: number,
  takerOrderId: number,
  turnover: number,
  executedAt: number
}

interface PcxFree {
  free: number,
  reserved: number,
  miscFrozen: number,
  feeFrozen: number
}
