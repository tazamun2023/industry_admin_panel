<template>
  <custome-modal
    :title="` ${$t('address.Add Address') } `"
    :show-modal="showModal"
    @close="closeAddressModel"
    size="lg">

    <div class="relative">
      <GmapMap :center='center' :zoom='12' ref="map" :options="mapOptions" @idle="handleIdleChanged"
               @bounds_changed="handleBoundsChanged" style='width:100%;  height: 70vh;'>

        <GmapAutocomplete @place_changed="setPlace"
                          class="absolute w-50 top-0 left-1/2 transform -translate-x-1/2 mt-8"/>

        <GmapMarker :position="markerPosition" :clickable="true" @click="handleMarkerClick"/>
        <div class="absolute bottom-134 left-0 w-full h-10 bg-white  flex items-center justify-center">
          <span class="text-black" v-if="address.name">{{ address.name }}</span>
        </div>
        <div class="map-button flex gap-2" @click="getCurrentLocation">
          <button class="map-button flex gap-2 bg-white items-center  border-theem" @click="getCurrentLocation">
            <div class="flex justify-between">
              <img src="~/assets/icon/location.svg" alt="location" style="width: 30px; height: 30px"/>
              <span class="text-nowrap"> {{ $t('googleMap.LocateMe') }} </span>
            </div>
          </button>
        </div>
      </GmapMap>
    </div>

    <template v-slot:buttons>
      <button @click="confirmAddress()" class="bg-theem rounded-lg text-white w-[100px]">

        {{ $t('googleMap.confirm') }}
      </button>
    </template>
  </custome-modal>
</template>

<script>

import CustomeModal from "./CustomeModal.vue";

export default {
  name: 'GoogleMap',
  components: {CustomeModal},
  props: ['dataAddressUpdate', 'showModal'],
  data() {
    return {
      center: {lat: 24.7135517, lng: 46.6752957},
      currentPlace: null,
      markers: [],
      places: [],
      mapOptions: {
        mapTypeControl: false,
        fullscreenControl: false
      },
      idleTimer: null,
      address: {
        name: "",
        city: "",
        country: "",
        country_code: "",
        district: "",
        postal_code: "",
        street: ""
      },
      markerPosition: {lat: 24.7135517, lng: 46.6752957}
    }
  },

  methods: {
    closeAddressModel() {
      this.$emit('close')

    },

    handleMarkerClick(e) {
      console.log(e)

    },

    setPlace(place) {
      console.log(place)
      this.currentPlace = place;
      this.center.lat = this.currentPlace.geometry.location.lat();
      this.center.lng = this.currentPlace.geometry.location.lng();
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({position: marker});
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    handleIdleChanged() {
      const map = this.$refs.map.$mapObject;
      const center = map.getCenter();
      const geocoder = new google.maps.Geocoder();
      const latlng = {lat: center?.lat() ?? 24.7135517, lng: center?.lng() ?? 46.6752957};

      google.maps.event.addListener(map, 'click', (event) => {
        this.markerPosition = {lat: event.latLng.lat(), lng: event.latLng.lng()};
        geocoder.geocode({location: event.latLng}, (results, status) => {
          this.setAddressData(status, results)
        });
      });

      geocoder.geocode({location: latlng}, (results, status) => {
        this.setAddressData(status, results)
      });

      this.markerPosition = {lat: center?.lat() ?? 24.7135517, lng: center?.lng() ?? 46.6752957};
    },

    setAddressData(status, results) {
      this.address = {
        name: "",
        city: "",
        country: "",
        country_code: "",
        district: "",
        district2: "",
        postal_code: "",
        street: "",
        street2: ""
      }
      if (status === "OK") {
        if (results[0]) {
          console.log("results", results, results[0])
          const addressComponents = results[0].address_components;
          this.address.name = results[0].formatted_address;
          for (const component of addressComponents) {
            if (component.types.includes("country")) {
              this.address.country = component.long_name;
              this.address.country_code = component.short_name;
            } else if (component.types.includes("administrative_area_level_1")) {

              this.address.city = component.long_name.trim().split(' ')[0];
            } else if (component.types.includes("administrative_area_level_2")) {
              this.address.district = component.long_name;
            } else if (component.types.includes("sublocality")) {
              this.address.district2 = component.long_name;
            } else if (component.types.includes("route")) {
              this.address.street = component.long_name;
            } else if (component.types.includes("locality")) {
              this.address.street2 = component.long_name;
            } else if (component.types.includes("postal_code")) {
              this.address.postal_code = component.long_name;

            }
          }
        }
        if (results[1]) {
          const addressComponents = results[1].address_components;
          this.address.name = results[1].formatted_address;
          for (const component of addressComponents) {
            if (component.types.includes("sublocality")) {
              this.address.district2 = component.long_name;
            } else if (component.types.includes("route")) {
              this.address.street = component.long_name;
            } else if (component.types.includes("locality")) {
              this.address.street2 = component.long_name;
            }
          }
        }
        if (this.address.district == "")
          this.address.district = (this.address.district2 !== "") ? this.address.district2 : this.address.street2
        if (this.address.street == "")
          this.address.street = (this.address.district2 !== "") ? this.address.district2 : this.address.street2

        if (this.address.district !== ''
          && this.address.district !== this.address.district2
          && this.address.district !== this.address.street)
          this.address.district += ' - ' + this.address.district2;
        console.log(this.address)
      } else {
        console.log("failed due to: " + status);
      }

    },

    handleBoundsChanged() {
      const map = this.$refs.map.$mapObject;
      const center = map.getCenter();
      const geocoder = new google.maps.Geocoder();
      const latlng = {lat: center?.lat() ?? 24.7135517, lng: center?.lng() ?? 46.6752957};
      this.markerPosition = {lat: center?.lat() ?? 24.7135517, lng: center?.lng() ?? 46.6752957};
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.center = {lat: latitude, lng: longitude};
            this.markerPosition = {lat: latitude, lng: longitude};
            console.log(position);
          },
          error => {
            console.error('Error:', error);
          }
        );
      } else {
        console.error('not supported by this browser.');
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    confirmAddress() {
      if (this.address.country_code != "" || this.dataAddressUpdate?.id != "") {
        if (this.address.country_code != "") {
          let data = {
            lat: this.markerPosition.lat,
            lng: this.markerPosition.lng,
            id: this.dataAddressUpdate?.id,
            phone: this.dataAddressUpdate?.phone,
            email: this.dataAddressUpdate?.email,
            name: this.dataAddressUpdate?.name ?? "",
            zip: this.setEmptyString(this.dataAddressUpdate?.zip, this.address.postal_code),
            district: this.setEmptyString(this.dataAddressUpdate?.district, this.address.district),
            street: this.setEmptyString(this.dataAddressUpdate.street, this.address.street),
            country_id: this.dataAddressUpdate?.country_id,
            country_code: this.address.country_code ?? '967',
            postal_code: this.address.postal_code,
            city_name: this.address.city,
            address_name: this.dataAddressUpdate.address_name,
            city_id: this.dataAddressUpdate?.city_id,
            default: this.dataAddressUpdate?.default === 1 ? true : false,
            building_number: this.dataAddressUpdate?.building_number,
            type: this.dataAddressUpdate?.type,
            nearest_landmark: this.dataAddressUpdate?.nearest_landmark ? this.dataAddressUpdate?.nearest_landmark : null,
          }
          this.$emit('confirm', data)

        } else
          this.$emit('confirm', this.dataAddressUpdate)
      }
    },
    setEmptyString(old, new_data) {
      if (old == "" || old == null) {
        return new_data;
      }
      return old ?? new_data;
    }
  },
  mounted() {
    if (this.dataAddressUpdate?.id) {
      this.center.lat = parseFloat(this.dataAddressUpdate?.lat) ?? 24.7135517
      this.center.lng = parseFloat(this.dataAddressUpdate?.lng) ?? 46.6752957
      this.markerPosition.lat = parseFloat(this.dataAddressUpdate?.lat) ?? 24.7135517
      this.markerPosition.lng = parseFloat(this.dataAddressUpdate?.lng) ?? 46.6752957
    }
  }
};
</script>

<style>
.vue-map-hidden {
  display: block !important;
}

.pac-container {
  z-index: 100000000000000000000 !important;
}

.map-button {
  position: absolute;
  bottom: 7px;
  right: 55%;
  transform: translateX(-50%);
  /* background-color: #ffffff; */
  /* border: 1px solid; */
  width: max-content;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}

.bottom-134 {
  bottom: 134px;
}

</style>
