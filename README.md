# Arben Home - an e-commerce website with headless cms (sanity)

This is a complete to the e-commerce website that can be used in production, it lacks payment method as an option right now to target algerian market, the project now is in the testing phase. 

## Table of contents

- [Overview](#overview)
  - [Main owner functionalities](#main-owner-functionalities)
  - [Main users functionalities](#main-users-functionalities)
- [Links](#links)
- [Technologies used](#technologies-used)
- [Author](#author)

## Overview

### Main owner functionalities

The owner of this wesite should be able to:

- Perform CRUD operations on products using a deployed sanity studio.
- Customize user interface (images, text, faq, etc...) using also sanity studio.
- The website comes with three fully supported languages (ar, en, fr) for both interface & backend data.
- Orders when triggered, the quantity and the availability of a product are managed automatically, and an order notification email will be sent too.
- Recieve also emails from clients with a contact form.

### Main users functionalities

The user of this wesite should be able to:

- Choose one of three supported languages we mentioned earlier.
- Navigate throw each product's category page, or perform an advanced search & sorting.
- Ability to see if the product is available or not without navigating to the product page.
- The user also will recieve an email when ordering a product to confirm that the order is issued.
- We chose on purpose to not include payment method, because it is not the most popular option for algerian market, but in future we might add ability to pay with CCP/EDAHABIA.

## Links 

- Live URL: [Vercel](https://arben-home-v2.vercel.app/)

## Technologies used

- Next JS
- CSS Modules
- Sanity CMS
- React context

## Author

- Website - [Anas Arif](https://redshift14.github.io/portfolio/)