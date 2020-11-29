
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLoadingDelay } from '@polkadot/react-hooks';
import Detail from './Detail';
import { useTranslation } from '@polkadot/app-accounts/translate';

const ChainStatus = styled.div`
  flex-direction: column;
  padding: 16px;
  padding-bottom: 0;
  border: 1px solid #DCE0E2;
  margin-left: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255);
  font-size: 16px;
  color: rgba(0, 0, 0, 0.72);
  width: 30%;
  margin-bottom: 0;
  position: relative;

  > .canvas{
    margin-top: 32px;
  }
  > .details{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 35px;
    justify-content: space-between;
  }

`;

const Hr = styled.hr`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  border: 0.5px solid #eee;
`;

type Option = {
  canvas: HTMLCanvasElement,
  colors: string[],
  width: number,
}
class Piechart {
  constructor(options: Option) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.colors = options.colors;
  }

  drawPieSlice = (
    ctx: HTMLCanvasElement,
    centerX,
    centerY,
    radius,
    startAngle,
    endAngle,
    color
  ) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  }

  draw = (data = []) => {
    if (data.length <= 0) {
      return;
    }

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const ctx = this.ctx;
    const radius = Math.min(centerX, centerY);

    const totalValue = data.reduce((result, item) => result + item, 0);
    let colorIndex = 0;
    let startAngle = Math.PI;

    for (const categ in data) {
      const val = data[categ];
      const sliceAngle = (2 * Math.PI * val) / totalValue;

      this.drawPieSlice(
        ctx,
        centerX,
        centerY,
        radius,
        startAngle,
        startAngle + sliceAngle,
        this.colors[colorIndex % this.colors.length]
      );
      startAngle += sliceAngle;
      colorIndex++;
    }

    this.drawPieSlice(
      ctx,
      centerX,
      centerY,
      radius - this.options.width,
      0,
      2 * Math.PI,
      '#ffffff'
    );

    ctx.fillStyle = 'black';
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
  }
}

export default function (): React.ReactElement {
  const { t } = useTranslation();
  const isLoading = useLoadingDelay();
  const detailList = [
    {
      color: 'yellow',
      type: 'PCX',
      data: '57.6%'
    },
    {
      color: 'orange',
      type: 'X-BTC',
      data: '1.1%'
    },
    {
      color: 'blue',
      type: 'TR',
      data: '21.3%'
    },
    {
      color: 'grey',
      type: 'PolkaX',
      data: '20%'
    }
  ];
  const canvasRef = useRef(null);
  const colors = [
    '#F6C94A',
    '#C2C2C2',
    '#46AEE2',
    '#F7931B'
  ];

  const power = [{ power: 57.6 }, { power: 7.0 }, { power: 15.4 }, { power: 20 }];

  useEffect(() => {
    if (power) {
      const canvas = canvasRef.current;

      canvas.height = 148;

      const chart = new Piechart({
        canvas: canvas,
        colors,
        width: 40
      });

      const percents = power.map((p) => p.power);

      chart.draw(percents);
    }
  }, [power, colors]);

  return (
    <ChainStatus>
      <p>{t('Share of mining revenue')}</p>
      <Hr />
      <div className='canvas'>
        <canvas ref={canvasRef} />
      </div>
      <div className='details'>
        {
          isLoading ? undefined : detailList.map(({ color, data, type }) =>
            (
              <Detail color={color}
                data={data}
                type={type} />
            ))
        }
      </div>
    </ChainStatus>
  );
}
