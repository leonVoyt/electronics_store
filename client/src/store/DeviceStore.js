import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  constructor() {
    this._selectedType = {}
    this._selectedBrand = {}

    this._types = []
    this._brands = []
    this._devices = []
    makeAutoObservable(this)
  }
  setSelectedType(type) {
    this._selectedType = type
  }
  setSelectedBrand(brand) {
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
}
