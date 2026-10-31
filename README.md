# Vindly — Auto Return to Maps

Vindly is a Smart HUD application for Android that brings navigation back after a phone call and after returning to the home screen. It sits on top of Google Maps, Yanosik, Waze, and Calimoto. Free core with no ads; advanced automation and Quiet Tech features are Premium.

## What it does

- **Smart HUD & Navigation Bridge (Free):** Cockpit controls stay on the map; automatic return after calls and home-screen drops
- **Intelligent Navigation Bridge (Premium):** Custom return-to-map timers per third-party app
- **Adaptive Horizon & Ghost UI (Premium):** Amber Horizon circadian night optics protecting night vision; Ghost UI auto-dims icons during cruising
- **Music Hub & Audio Node (Premium):** Fluid in-ride media controls directly over navigation
- **Vindly AI (Premium):** Spoken message summaries with hands-free voice/tap confirmation in a Zero Data Retention model
- **Focus Lock & Smart Hide (Free/Premium):** System DND session control; quick HUD toggle and auto-hiding in Premium
- **Full Interface Control (Premium):** Fixed 56 dpi in Free; fluid icon sizing slider, custom palettes, and Premium Gold (`#F59E0B`) in Premium
- Balanced for both car drivers and motorcyclists (vibration, rain, gloves)

## Technical basis

- Android 10+ (SDK API 29–36)
- AccessibilityService — detect screen changes and restore navigation
- Notification listener — in-ride alerts and message summaries
- Microphone (`RECORD_AUDIO`) — ephemeral voice confirmation ("Yes/No")
- Privacy & Reliability — on-device state engine with Google Firebase (Crashlytics + GA4 `prod`) stability diagnostics; Zero Data Retention for AI summaries

## Pricing & Trial

- Free core with no ads
- Premium: 1-month free trial (`annual-trial-1m`) on the annual plan ($29.99/year US, 99.99 PLN/rok PL) or monthly plan (24.99 PLN/mo PL)

## Links

- Website: https://vindly.app
- Contact: hello@vindly.app
- Publisher: [NoiseLogic](https://noiselogic.io)
