import {
  BannerActionTypes,
  BROWSE_BANNERS,
  LOAD_BANNER,
  LOAD_RECENT_BANNERS,
  LOAD_RECENT_BANNERS_ERROR,
  RESET_BROWSED_BANNERS,
  SEARCH_BANNERS,
  RESET_SEARCH_BANNERS,
  AGENT_BANNERS,
  RESET_AGENT_BANNERS,
  CREATE_BANNER,
  REMOVE_CREATED_BANNER,
  EDIT_BANNER,
  SEARCH_MAP_BANNERS,
  SEARCH_MAP_OFFICIAL_BANNERS,
  CHANGE_BANNER_SETTINS,
  USER_BANNER_LIST_BANNERS,
  RESET_USER_BANNER_LIST_BANNERS,
} from './actionTypes'
import { extend, extendSorted } from './helpers'
import { BannerState } from './types'

const initialState: BannerState = {
  banners: [],
  recentBanners: [],
  browsedBanners: [],
  searchBanners: [],
  agentBanners: [],
  officialBanners: [],
  userBannerListBanners: [],
  canBrowseMore: true,
  canSearchMore: true,
  hasMoreAgentBanners: true,
  hasMoreUserBannerListBanners: true,
  createdBanner: undefined,
}

export default (state = initialState, action: BannerActionTypes) => {
  switch (action.type) {
    case LOAD_BANNER:
      return { ...state, banners: extend([action.payload], state.banners) }
    case LOAD_RECENT_BANNERS:
      return {
        ...state,
        banners: extendSorted(state.banners, action.payload),
        recentBanners: action.payload,
      }
    case RESET_BROWSED_BANNERS:
      return { ...state, browsedBanners: [] }
    case BROWSE_BANNERS:
      return {
        ...state,
        banners: extendSorted(state.banners, action.payload.banners),
        browsedBanners: extend(state.browsedBanners, action.payload.banners),
        canBrowseMore: action.payload.hasMore,
      }
    case SEARCH_BANNERS:
      return {
        ...state,
        banners: extendSorted(state.banners, action.payload.banners),
        searchBanners: extend(state.searchBanners, action.payload.banners),
        canSearchMore: action.payload.hasMore,
      }
    case RESET_SEARCH_BANNERS:
      return { ...state, searchBanners: [] }
    case AGENT_BANNERS:
      return {
        ...state,
        banners: extendSorted(state.banners, action.payload.banners),
        agentBanners: extend(state.agentBanners, action.payload.banners),
        hasMoreAgentBanners: action.payload.hasMore,
      }
    case RESET_AGENT_BANNERS:
      return { ...state, agentBanners: [] }
    case USER_BANNER_LIST_BANNERS:
      return {
        ...state,
        banners: extendSorted(state.banners, action.payload.banners),
        userBannerListBanners: extend(
          state.userBannerListBanners,
          action.payload.banners
        ),
        hasMoreUserBannerListBanners: action.payload.hasMore,
      }
    case RESET_USER_BANNER_LIST_BANNERS:
      return { ...state, userBannerListBanners: [] }
    case LOAD_RECENT_BANNERS_ERROR:
      return state
    case CREATE_BANNER:
      return { ...state, createdBanner: action.payload }
    case REMOVE_CREATED_BANNER:
      return { ...state, createdBanner: undefined }
    case EDIT_BANNER:
      return { ...state, createdBanner: action.payload }
    case SEARCH_MAP_BANNERS:
      return { ...state, banners: extendSorted(state.banners, action.payload) }
    case SEARCH_MAP_OFFICIAL_BANNERS:
      return {
        ...state,
        banners: extendSorted(state.banners, action.payload),
        officialBanners: extendSorted(state.officialBanners, action.payload),
      }
    case CHANGE_BANNER_SETTINS: {
      const { banner, bannerSettings } = action.payload
      const changedBanner = { ...banner, ...bannerSettings }
      return {
        ...state,
        banners: extend([changedBanner], state.banners),
        officialBanners: extendSorted(state.officialBanners, [changedBanner]),
      }
    }
    default:
      return state
  }
}
