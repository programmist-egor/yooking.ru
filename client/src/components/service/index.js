export default class Service {
    _apiUrlLookUp = `http://engine.hotellook.com/api/v2/lookup.json?query=`;
    _apiUrlHotels = `http://engine.hotellook.com/api/v2/static/hotels.json?locationId=`;
    _apiUrlLocationDump = "http://yasen.hotellook.com/tp/public/widget_location_dump.json?id=";
    _apiUrlCache = "http://engine.hotellook.com/api/v2/cache.json?location="
    _token = "&token=1c69985f67a963aa75554c24b242c2a1"
    _currency = "&currency=rub"
    async fetchRequest(url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Не удалось получить данные, полученный статус: ${res.status}`);
        }
        return await res.json();
    }

    async getResource(cityAndHotel, limit, lookFor, lang) {
        const res = await fetch(`${this._apiUrlLookUp}${cityAndHotel}${limit}${lookFor}${lang}${this._token}`);
        if(!res.ok) {
            throw  new Error(`Не удалось получить ${cityAndHotel}, полученый ${res.status}`)
        }
        return await res.json()
    }
    async getResourceCache(cityAndHotel, limit, checkIn, checkOut) {
        const res = await fetch(`${this._apiUrlCache}${cityAndHotel}${this._currency}&limit=${limit}&check_in=${checkIn}&check_out=${checkOut}${this._token}`);
        if(!res.ok) {
            throw  new Error(`Не удалось получить ${cityAndHotel}, полученый ${res.status}`)
        }
        return await res.json()
    }
    async getResourceHotelsList(cityId) {
        const res = await fetch(`${this._apiUrlHotels}${cityId}${this._token}`);
        if(!res.ok) {
            throw  new Error(`Не удалось получить ${cityId}, полученый ${res.status}`)
        }
        return await res.json()
    }
    async getResourceLocationDump(cityId,limit,type, checkIn, checkOut, lang) {
        const res = await fetch(
            `${this._apiUrlLocationDump}${cityId}${this._currency}&limit=${limit}&type=${type}&check_in=${checkIn}&check_out=${checkOut}&language=${lang}${this._token}`
        );
        if(!res.ok) {
            throw  new Error(`Не удалось получить ${cityId}, полученый ${res.status}`)
        }
        return await res.json()
    }
    getCityAndHotels(cityAndHotel, limit, lookFor, lang) {
        return this.getResource(cityAndHotel, limit, lookFor, lang)
    }
    getHotelsAtCity(cityId) {
        return this.getResourceHotelsList(cityId)
    }
    getLocationDump(cityId, limit,type, checkIn, checkOut, lang) {
        return this.getResourceLocationDump(cityId, limit, type, checkIn, checkOut, lang)
    }



    // async getResource({ cityAndHotel, limit, lookFor, lang }) {
    //     const url = `${this._apiUrlLookUp}${cityAndHotel}${limit}${lookFor}${lang}${this._token}`;
    //     return this.fetchRequest(url);
    // }
    //
    // async getResourceHotelsList({ city_id }) {
    //     const url = `${this._apiUrlHotels}${city_id}${this._token}`;
    //     return this.fetchRequest(url);
    // }
    //
    // async getResourceLocationDump({ cityId, limit, type, checkIn, checkOut, lang }) {
    //     const url = `${this._apiUrlLocationDump}${cityId}${this._currency}&limit=${limit}&type=${type}&check_in=${checkIn}&check_out=${checkOut}&language=${lang}${this._token}`;
    //     return this.fetchRequest(url);
    // }
    //
    //
    // getCityAndHotels(params) {
    //     return this.getResource(params);
    // }
    //
    // getHotelsAtCity(params) {
    //     return this.getResourceHotelsList(params);
    // }
    //
    // getLocationDump(params) {
    //     return this.getResourceLocationDump(params);
    // }

}


