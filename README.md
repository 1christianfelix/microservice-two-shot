# Wardrobify

Team:

- Avisha - Shows
- Christian - Hats

## Design

Poll items from the Location and Bin API to update our hat and shoe models. Those models will the return JSON objects for us to use in the frontend development.
We will use React to create components that allows the user to create/delete items and view all items.

## Shoes microservice

The shoes microservice will consist of the shoe model and the bin value object. The retrieve information for our value object, we poll data about binsfrom the Wardrobe API. The BinVO will be used as the Foreign Key to our Shoe Models. We then use that connection to give the user options to select a bin when creating a shoe.

## Hats microservice

The hats microservices constisted of the Hat Model and the LocationVO model. We polled data from the Location List API in order to update/create instances of LocationVO model. The LocationVO model contains all properties of the Location model, except for the same ID. We use the href property to sync the LocationVO to the proper Location object. 
