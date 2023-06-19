import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  constructor() {
    this._selectedType = {}
    this._selectedBrand = {}

    this._types = [
      { id: 1, name: 'fridger' },
      { id: 2, name: 'smartPhone' },

      { id: 3, name: 'LapTop' },
      { id: 4, name: 'TV' },
    ]
    this._brands = [
      { id: 1, name: 'Samsung' },
      { id: 2, name: 'Apple' },
      { id: 3, name: 'Asus' },
      { id: 4, name: 'Lenovo' },
    ]
    this._devices = [
      {
        id: 1,
        name: 'iphone 12 pro',
        price: '25000',
        rating: 0,
        img: `https://i.citrus.world/imgcache/size_800/uploads/shop/8/3/839452defe42b04a09b30f1915720093.jpg`,
      },
      {
        id: 2,
        name: 'iphone 12 pro',
        price: '25000',
        rating: 0,
        img: `https://i.citrus.world/imgcache/size_800/uploads/shop/8/3/839452defe42b04a09b30f1915720093.jpg`,
      },
      {
        id: 3,
        name: 'iphone 12 pro',
        price: '25000',
        rating: 0,
        img: `https://i.citrus.world/imgcache/size_800/uploads/shop/8/3/839452defe42b04a09b30f1915720093.jpg`,
      },
      {
        id: 4,
        name: 'iphone 12 pro',
        price: '25000',
        rating: 0,
        img: `https://i.citrus.world/imgcache/size_800/uploads/shop/8/3/839452defe42b04a09b30f1915720093.jpg`,
      },
      {
        id: 5,
        name: 'iphone 12 pro',
        price: '25000',
        rating: 0,
        img: `https://i.citrus.world/imgcache/size_800/uploads/shop/8/3/839452defe42b04a09b30f1915720093.jpg`,
      },
      {
        id: 6,
        name: 'iphone 12 pro',
        price: '25000',
        rating: 0,
        img: `https://i.citrus.world/imgcache/size_800/uploads/shop/8/3/839452defe42b04a09b30f1915720093.jpg`,
      },
    ]
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
  SetBrands(brands) {
    this._user = brands
  }
  SetDevices(devices) {
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
