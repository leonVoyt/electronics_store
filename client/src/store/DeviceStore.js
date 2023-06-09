import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  constructor() {
    this._selectedType = {}
    this._selectedBrand = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 8
    this._types = []
    this._brands = []
    this._devices = []
    this._rating = []
    this._deviceBasket = []
    makeAutoObservable(this)
  }
  setDeviceBasket(deviceBasket) {
    this._deviceBasket = deviceBasket
  }
  setRating(rating) {
    this._rating = rating
  }
  setSelectedType(type) {
    this.setPage(1)
    this._selectedType = type
  }
  setSelectedBrand(brand) {
    this.setPage(1)
    this._selectedBrand = brand
  }
  setTypes(types) {
    this._types = types
  }
  setBrands(brands) {
    this._brands = brands
  }
  setDevices(devices) {
    this._devices = devices
  }
  setPage(page) {
    this._page = page
  }
  setLimit(limit) {
    this._limit = limit
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount
  }

  get rating() {
    return this._rating
  }
  get types() {
    return this._types
  }
  get brands() {
    return this._brands
  }
  get devices() {
    return this._devices
  }
  get selectedType() {
    return this._selectedType
  }
  get selectedBrand() {
    return this._selectedBrand
  }

  get page() {
    return this._page
  }
  get limit() {
    return this._limit
  }
  get totalCount() {
    return this._totalCount
  }

  get deviceBasket() {
    return this._deviceBasket
  }
}
