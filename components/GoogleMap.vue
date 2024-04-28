<template>
  <div class="relative">
    <GmapMap :center='center' :zoom='12' ref="map" :options="mapOptions" @idle="handleIdleChanged"
      @bounds_changed="handleBoundsChanged" style='width:100%;  height: 70vh;'>
      <GmapAutocomplete @place_changed="setPlace" class="absolute w-50 top-0 eft-1/1  mt-8">
      </GmapAutocomplete>
      <GmapMarker :position="markerPosition" :clickable="true" @click="handleMarkerClick" />
      <div class="absolute bottom-16 left-0 w-full h-10 bg-white bg-opacity-50 flex items-center justify-center">
        <span class="text-black" v-if="address.name">{{ address.name }}</span>
      </div>
      <div class="map-button flex gap-2" @click="getCurrentLocation">
        <svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
          <g filter="url(#location-pin_svg__a)">
            <path d="M17 21.5c0 .276-2.239.5-5 .5s-5-.224-5-.5 2.239-.5 5-.5 5 .224 5 .5Z" fill="currentColor"></path>
          </g>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M13 16.93A7.001 7.001 0 0 0 12 3a7 7 0 0 0-1 13.93V21a1 1 0 1 0 2 0v-4.07ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            fill="currentColor"></path>
          <defs>
            <filter id="location-pin_svg__a" x="4" y="18" width="16" height="7" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_4521_253"></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <span> {{ $t('googleMap.LocateMe') }} </span>
      </div>
    </GmapMap>
    <div class="mt-4">
      <button @click="confirmAddress()" class="bg-theem rounded-lg text-white w-[100px]">

        {{ $t('googleMap.confirm') }}
      </button>
      <button @click="$emit('cancel')" class="outline-btn plr-30 plr-sm-15">
        {{ $t('googleMap.cancel') }}
      </button>
    </div>


  </div>
</template>

<script>

export default {
  name: 'GoogleMap',
  props: ['dataAddressUpdate'],
  data() {
    return {
      center: { lat: 24.7135517, lng: 46.6752957 },
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
        street: ""
      },
      markerPosition: { lat: 24.7135517, lng: 46.6752957 }
    }
  },

  methods: {
    setPlace(place) {
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
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    handleIdleChanged() {
      const map = this.$refs.map.$mapObject;
      const center = map.getCenter();
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat: center?.lat() ?? 24.7135517, lng: center?.lng() ?? 46.6752957 };

      google.maps.event.addListener(map, 'click', (event) => {
        this.markerPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        geocoder.geocode({ location: event.latLng }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              const addressComponents = results[0].address_components;
              this.address.name = results[0].formatted_address;
              for (const component of addressComponents) {
                if (component.types.includes("locality")) {
                  this.address.city = component.long_name;
                } else if (component.types.includes("country")) {
                  this.address.country = component.long_name;
                } else if (component.types.includes("route")) {
                  this.address.street = component.long_name;
                }
              }
              const inputFields = document.querySelectorAll('.pac-target-input');
              inputFields.forEach(input => {
                input.value = results[0].formatted_address;
              });
            } else {
              console.log("no results found");
            }
          } else {
            console.log("failed due to: " + status);
          }
        });
      });

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            const addressComponents = results[0].address_components;
            this.address.name = results[0].formatted_address;
            for (const component of addressComponents) {
              if (component.types.includes("locality")) {
                this.address.city = component.long_name;
              } else if (component.types.includes("country")) {
                this.address.country = component.long_name;
              } else if (component.types.includes("route")) {
                this.address.street = component.long_name;
              }
            }
            const inputFields = document.querySelectorAll('.pac-target-input');
            inputFields.forEach(input => {
              input.value = results[0].formatted_address;
            });
          } else {
            console.log("no results found");
          }
        } else {
          console.log("failed due to: " + status);
        }
      });

      this.markerPosition = { lat: center?.lat() ?? 24.7135517, lng: center?.lng() ?? 46.6752957 };
    },


    handleBoundsChanged() {
      const map = this.$refs.map.$mapObject;
      const center = map.getCenter();
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat: center?.lat() ?? 24.7135517, lng: center?.lng() ?? 46.6752957 };
      this.markerPosition = { lat: center?.lat() ?? 24.7135517, lng: center?.lng() ?? 46.6752957 };
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.center = { lat: latitude, lng: longitude };
            this.markerPosition = { lat: latitude, lng: longitude };
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
      let data = {
        lat: this.markerPosition.lat,
        lng: this.markerPosition.lng,
        id: this.dataAddressUpdate?.id,
        phone: this.dataAddressUpdate?.phone,
        email: this.dataAddressUpdate?.email,
        name: this.dataAddressUpdate?.name,
        zip: this.dataAddressUpdate?.zip,
        country_id: this.dataAddressUpdate?.country_id,
        address_name: this.address.name,
        street: this.address.street,
        city_id: this.dataAddressUpdate?.city_id,
        is_default: this.dataAddressUpdate?.default,
        building_number: this.dataAddressUpdate?.building_number,
        type: this.dataAddressUpdate?.type,
        nearest_landmark: this.dataAddressUpdate?.nearest_landmark ? this.dataAddressUpdate?.nearest_landmark : null,
      }
      this.$emit('confirm', data)
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

.map-button {
  position: absolute;
  bottom: 20px;
  left: 70%;
  transform: translateX(-50%);
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}
</style>