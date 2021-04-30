import React, { FC } from 'react'

import './banner-card.less'

import { ReactComponent as SVGExplorer } from '../../img/icons/explorer.svg'
import { ReactComponent as SVGPointer } from '../../img/icons/pointer.svg'
import { Banner } from '../../features/banner'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const getDistance = (distance: number) => `${(distance / 1000).toFixed(1)} km`

const BannerCard: FC<BannerCardProps> = ({ banner }) => {
  const url = banner && banner.picture && new URL(banner.picture, baseUrl).href
  const innerClassName =
    banner && banner.numberOfMissions > 18
      ? 'banner-card-picture-inner banner-card-picture-inner-animated'
      : 'banner-card-picture-inner'
  return (
    <div className="banner-card" key={banner?.uuid}>
      <div className="banner-card-title">{banner?.title}</div>
      {banner && url && (
        <div className="banner-card-picture">
          <div
            className={innerClassName}
            style={{ backgroundImage: `url(${url})` }}
          >
            <img alt={banner.title} src={url} />
          </div>
        </div>
      )}
      <div className="banner-info-item">
        <SVGExplorer fill="#1DA57A" className="icon" />
        {banner?.numberOfMissions} Missions,{' '}
        {banner && banner.lengthMeters
          ? getDistance(banner?.lengthMeters)
          : null}
      </div>
      <div className="banner-info-item">
        <SVGPointer fill="#1DA57A" className="icon" />
        {banner?.formattedAddress}
      </div>
    </div>
  )
}

export interface BannerCardProps {
  banner: Banner | undefined
}

export default BannerCard
