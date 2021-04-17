import React, { Fragment, FC } from 'react'
import { Card, Row } from 'antd'

import { Scrollbars } from 'react-custom-scrollbars'

import './banner-card.less'

import { ReactComponent as SVGExplorer } from '../../img/icons/explorer.svg'
import { ReactComponent as SVGPointer } from '../../img/icons/pointer.svg'
import { Banner } from '../../features/banner'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const getDistance = (distance: number) => `${(distance / 100).toFixed(2)}km`

const BannerCard: FC<BannerCardProps> = ({ banner }) => {
  return (
    <Fragment>
      <Row justify="center">
        <div className="banner-card" key={banner?.uuid}>
          <Card
            title={banner?.title}
            style={{ width: 448, backgroundColor: '#404040' }}
          >
            <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={284}>
              <Row align="top" justify="start" className="banner-pic">
                {banner && (
                  <img
                    alt={banner.title}
                    src={new URL(banner.picture, baseUrl).href}
                  />
                )}
              </Row>
            </Scrollbars>
            <div className="mt-1" />
            <Row align="middle">
              <SVGExplorer fill="#1DA57A" className="icon" />
              {banner?.numberOfMissions} Missions,{' '}
              {banner ? getDistance(banner?.lengthMeters) : null}
            </Row>
            <Row align="middle">
              <SVGPointer fill="#1DA57A" className="icon" />
              {banner?.formattedAddress}
            </Row>
          </Card>
        </div>
      </Row>
    </Fragment>
  )
}

export interface BannerCardProps {
  banner: Banner | undefined
}

export default BannerCard
