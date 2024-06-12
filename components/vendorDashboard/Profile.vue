<template>
    <div>
        <div class="lg:grid card lg:grid-cols-4 p-4">
            
            <div class="text-center">
                <p class="text-[20px] font-medium">Company Profile</p>
                <div>
                <div class="frame">
                <div>
                        <div class="circle-big">
                            <div class="text">
                                <img class="profile-image mx-auto" src="~/assets/images/vendorprofile.svg" alt="">
                            </div>
                            <svg>
                                <circle class="bg" cx="57" cy="57" r="52"></circle>
                                <circle class="progress" cx="57" cy="57" r="52"></circle>
                            </svg>
                        </div>
                </div>
                </div>
            </div>
                <p class="text-prograss">48%</p>
                <p class="text-prograss"><span class="bg-warninglight rounded-[15px] px-2 font-medium"> complete company profile</span></p>
            </div>
            <div class="col-span-3">
               <div class="lg:flex lg:flex-wrap gap-4 py-4">
                <button class="flex mx-auto my-2 min-w-[247px] lg:m-0 gap-3 p-[5px] items-center capitalize border border-cardb rounded-[16px]"><img class="h-[36px] w-[36px]" src="~/assets/icon/profile-1.svg" alt=""> profile and cntact info</button>
                <button class="flex mx-auto my-2 min-w-[247px] lg:m-0 gap-3 p-[5px] items-center capitalize border border-cardb rounded-[16px]"><img class="h-[36px] w-[36px]" src="~/assets/icon/map.svg" alt=""> Stores Addresses</button>
                <button class="flex mx-auto my-2 min-w-[247px]  lg:m-0 gap-3 p-[5px] items-center capitalize border border-cardb rounded-[16px]"><img class="h-[36px] w-[36px]" src="~/assets/icon/hugeicons_certificate-01.svg" alt="">VAT Certificate</button>
                <button class="flex mx-auto my-2 min-w-[247px]  lg:m-0 gap-3 p-[5px] items-center capitalize border border-cardb rounded-[16px]"><img class="h-[36px] w-[36px]" src="~/assets/icon/vat01.svg" alt=""> Shipping Options</button>
                <button class="flex mx-auto my-2 min-w-[247px] lg:m-0 gap-3 p-[5px] items-center capitalize border border-cardb rounded-[16px]"><img class="h-[36px] w-[36px]" src="~/assets/icon/bank-auction.svg" alt=""> Bank Accounts</button>
               </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.progress-container {
    width: 130px; /* Adjust the size of the container */
    height: 130px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.progress-bar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    /* border: 8px solid;  */
    /* Border thickness */
    /* border-color: #d3d3d3;  */
    /* Background color of the border */
    position: absolute;
    top: 0;
    left: 0;
    clip: rect(0, 130px, 130px, 65px); /* Adjust clip for the circle */
    transform: rotate(-135deg); /* Start progress bar from the top */
}

.progress-bar::before {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 8px solid #4caf50; /* Progress color */
    position: absolute;
    clip: rect(0, 65px, 130px, 0); /* Adjust clip for the circle */
    transform: rotate(calc(3.6deg * var(--progress))); /* Rotate according to progress */
    left:0
}

.profile-image {
    width: 80px;
    height: 80px;
    border: 2px solid #d3d3d3;
    border-radius: 50%;
    padding: 2px;
    margin-top: 6px;
}
</style>
<style scoped>
.headline {
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
}

.circle-big {
  position: relative;
  width: 114px;
  height: 114px;
  margin: 30px auto 25px auto;
}

.circle-big svg {
  width: 114px;
  height: 114px;
}

.circle-big .bg {
  fill: none;
  stroke-width: 3px;
  stroke: #343035;
}

.circle-big .progress {
  fill: none;
  stroke-width: 3px;
  stroke: #01A781;
  stroke-linecap: round;
  stroke-dasharray: 326.56;
  stroke-dashoffset: 60;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          animation: big 1.5s ease-in-out;
}

.circle-big .text {
  position: absolute;
  width: 100%;
  top: 10px;
  font-size: 24px;
  text-align: center;
  font-weight: 400;
  line-height: 22px;
  margin:0 auto;
}

.circle-big .text .small {
  font-size: 14px;
  color: #fff;
}

.circles-small {
  margin: 0 auto;
  width: 400px;
  height: 80px;
  text-align: center;
}

.circle-small {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 20px;
}

.circle-small svg {
  width: 80px;
  height: 80px;
}

.circle-small .bg {
  fill: none;
  stroke-width: 6px;
  stroke: #343035;
}

.circle-small .progress {
  fill: none;
  stroke-width: 6px;
  stroke: #9a0fe0;
  stroke-linecap: round;
  stroke-dasharray: 232.36;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
}

.circle-small .progress.one {
  stroke-dashoffset: 80;
          animation: one 2.5s ease-in-out, appear 1s;
}

.circle-small .progress.two {
  stroke-dashoffset: 140;
          animation: two 3.5s ease-in-out, appear 2s;
}

.circle-small .text {
  position: absolute;
  width: 100%;
  top: 26px;
  font-size: 17px;
  text-align: center;
  font-weight: 400;
  line-height: 16px;
}

.circle-small .text .small {
  font-size: 12px;
  color: #fff;
}

@keyframes big {
  from {
    stroke-dashoffset: 326.56;
  }
  to {
    stroke-dashoffset: 60;
  }
}

@keyframes one {
  from {
    stroke-dashoffset: 232.36;
  }
  to {
    stroke-dashoffset: 80;
  }
}

@keyframes two {
  from {
    stroke-dashoffset: 232.36;
  }
  to {
    stroke-dashoffset: 140;
  }
}

@keyframes appear {
	0%, 50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>