<template>
    <NuxtLayout name="account" arrowText="Twoje konto" title="Faktury i płatności">
        <div class="add-to-cart-button">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30"
                height="30" viewBox="0 0 256 256" xml:space="preserve">
                <defs>
                </defs>
                <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
                    transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                    <path
                        d="M 72.975 58.994 H 31.855 c -1.539 0 -2.897 -1.005 -3.347 -2.477 L 15.199 13.006 H 3.5 c -1.933 0 -3.5 -1.567 -3.5 -3.5 s 1.567 -3.5 3.5 -3.5 h 14.289 c 1.539 0 2.897 1.005 3.347 2.476 l 13.309 43.512 h 36.204 l 10.585 -25.191 h -6.021 c -1.933 0 -3.5 -1.567 -3.5 -3.5 s 1.567 -3.5 3.5 -3.5 H 86.5 c 1.172 0 2.267 0.587 2.915 1.563 s 0.766 2.212 0.312 3.293 L 76.201 56.85 C 75.655 58.149 74.384 58.994 72.975 58.994 z"
                        style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                        transform="matrix(1 0 0 1 0 0)" stroke-linecap="round" />
                    <circle cx="28.88" cy="74.33" r="6.16"
                        style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                        transform="matrix(1 0 0 1 0 0)" />
                    <circle cx="74.59" cy="74.33" r="6.16"
                        style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                        transform="matrix(1 0 0 1  0 0)" />
                    <path
                        d="M 62.278 19.546 H 52.237 V 9.506 c 0 -1.933 -1.567 -3.5 -3.5 -3.5 s -3.5 1.567 -3.5 3.5 v 10.04 h -10.04 c -1.933 0 -3.5 1.567 -3.5 3.5 s 1.567 3.5 3.5 3.5 h 10.04 v 10.04 c 0 1.933 1.567 3.5 3.5 3.5 s 3.5 -1.567 3.5 -3.5 v -10.04 h 10.041 c 1.933 0 3.5 -1.567 3.5 -3.5 S 64.211 19.546 62.278 19.546 z"
                        style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                        transform="matrix(1 0 0 1 0 0)" stroke-linecap="round" />
                </g>
            </svg>

        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";


.add-to-cart-button:hover {
    text-decoration: none !important;
    background: #4C9C5F;
    padding: 12px 21px;
    border: 1px solid #4C9C5F;
    font-weight: 500;
    font-size: 14px;
    border-radius: 7px;
    cursor: pointer;
}

.add-to-cart-button {
    border-radius: 7px;
    cursor: pointer;
    width: 77px;
    padding: 12px 21px;
    font-weight: 500;
    font-size: 14px;
    border: 1px solid #52AF68;
    text-decoration: none !important;
    background-color: #52AF68;
    color: #ffffff;
    transition: background-color 0.17s, color 0.17s, border-color 0.17s;
}


.retangle {
    padding: 16px 16px 16px 23px;
    margin-bottom: 20px;
    border-radius: 8px;
    width: 100%;
}

.retangle-title {
    font-size: 16px;
    font-weight: 500;
    margin-top: 6px;
}

.green {
    background: rgba(56, 209, 172, 0.17);
}

.gold {
    background: rgba(209, 157, 56, 0.17);
}

.blue {
    background: rgba(43, 59, 199, 0.17);
}
</style>
