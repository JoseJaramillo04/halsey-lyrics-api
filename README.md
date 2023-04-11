
# Halsey Lyric Snippets API
[![Button Example](https://img.shields.io/badge/Live_Link_to_RapidAPI_[API_HOST]-37a779?style=for-the-badge)](https://rapidapi.com/JoseJaramillo04/api/halsey-lyric-snippets)

A Node.js API which serves lyrics snippets from Halsey's albums. The API allows users to request specific lyrics by album or by a specific song, and also includes the option to request a random song from Halsey's entire discography. The API can be accessed by specifying the artist name, which currently only supports "Halsey".



## API Reference

| Header Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `X-RapidAPI-Key` | `Enum` | **Required**. Your API key |
| `X-RapidAPI-Host` | `string` | **Required**. API host address |

#### Retrieve all songs from database

```http
  GET /
```

##### sample JSON response
```json
[
  {
    "_id": "63b79021fac0fba0d5e1d177",
    "name": "Is There Somewhere",
    "lyrics": [
      "You were dancing in your tube socks in our hotel room\nFlashing those eyes like highway signs",
      "I just wanna feel your lips against my skin",
      "White sheets, bright lights, crooked teeth, and the nightlife\nYou told me this is right where it begins",
      ...
    ]
  }, ...
]
```


#### Get random song out of ${artist}

```http
  GET /Halsey/song/random
```
##### sample JSON response
```json
{
  "_id": "63b886e7c8450e8550fa6d59",
  "name": "Young God",
  "lyrics": [
    "I'm the king and you're the queen and we will stumble through heaven",
    "If there's a light at the end, it's just the sun in your eyes",
    ...
  ]
}
```

#### Get specified ${song}

```http
  GET /song/${song name}
```
##### sample JSON response
```json
[
  {
    "_id": "63b918e0b13bd951c8a14c20",
    "name": "Ashley",
    "lyrics": [
      "Standing now, in the mirror that I built myself\nAnd I can't remember why the decision wasn't mine",
      "And I can't remember why the decision wasn't mine\nBut it seems I'm only clingin' to an idea now",
      ...
    ]
  }
]
```

#### Get all songs from ${artist}

```http
  GET /Halsey/song
```
##### sample JSON response
```json
[
  {
    "_id": "63b7938efac0fba0d5e1d179",
    "name": "Trouble (stripped)",
    "lyrics": [
      "Would you bleed for me?\nLick it off my lips like you needed me?",
      "Would you sit me on a couch with your fingers in my mouth?",
      "You look so cool when you're reading me",
      "Let's cause a little trouble",
      ...
    ]
  },
  ...
]
```

#### Get random song out of specified ${artist} and specified ${album}

```http
  GET /Halsey/album/${album}/song/random
```
##### sample JSON response
```json
{
  "_id": "63b89552c8450e8550fa6d64",
  "name": "Lie",
  "lyrics": [
    "Breakfast is cold, as cold as our bed\nI'm watching you choke down the words that you said",
    "I watch you devour, mistake me for bread\nWell boy, is you fed? Or are you misled?",
    ...
  ]
}
```

#### Get all songs from specified ${artist} and specified ${album}

```http
  GET /Halsey/album/${album}/song
```
##### sample JSON response
```json
[
  {
    "_id": "63b91b0bb13bd951c8a14c21",
    "name": "clementine",
    "lyrics": [
      "I'd like to tell you that my sky's not blue, it's violent rain",
      "I'd like to tell you that my sky's not blue, it's violent rain\nAnd in my world, the people on the street don't know my name",
      ...
    ]
  },
  ...
]
```

#### Get specified ${album} information from ${artist}

```http
  GET /Halsey/album/${album}
```
##### sample JSON response
```json
[
  {
    "_id": "63b79c76fac0fba0d5e1d17b",
    "name": "Badlands (Deluxe Edition)",
    "releaseDate": "2015-08-28T05:00:00.000Z",
    "songs": [
      "63b79d0efac0fba0d5e1d17f",
      "63b79e8bfac0fba0d5e1d180",
      "63b7a8f6fac0fba0d5e1d181",
      ...
    ],
    "artist": "Halsey"
  }
]
```

#### Get all albums from ${artist}

```http
  GET /Halsey/album
```
##### sample JSON response
```json
[
  {
    "_id": "63b9128cb13bd951c8a14c1f",
    "name": "Manic",
    "releaseDate": "2020-01-17T06:00:00.000Z",
    "songs": [
      "63b918e0b13bd951c8a14c20",
      "63b91b0bb13bd951c8a14c21",
      ...
    ],
    "artist": "Halsey"
  }
  ...
]
```

#### random song & song's album information out of ${artist}

```http
  GET /${artist}/song/random/info
```
##### sample JSON response
```json
{
  "albumId": "63b9128cb13bd951c8a14c1f",
  "albumName": "Manic",
  "releaseDate": "2020-01-17T06:00:00.000Z",
  "albumArtist": "Halsey",
  "song": {
    "_id": "63b9d7ddfe9002caf55acbe9",
    "name": "I HATE EVERYBODY",
    "lyrics": [
      "I'm my own biggest enemy\nYeah, all my empathy's a disaster",
      "Feelin' somethin' like a scaly thing\nWrapped too tightly 'round my own master",
      ...
    ]
  }
}
```



#### Get album by ${id}

```http
  GET /album/id/${id}
```
##### sample JSON response
```json
{
  "_id": "63b88a2bc8450e8550fa6d5c",
  "name": "Hopeless Fountain Kingdom (Deluxe)",
  "releaseDate": "2017-06-02T05:00:00.000Z",
  "songs": [
    "63b88f02c8450e8550fa6d5d",
    "63b8905fc8450e8550fa6d5e",
    ...
  ],
  "artist": "Halsey"
}
```

#### Get song by ${id}

```http
  GET /song/id/${id}
```
##### sample JSON response
```json
  {
    "_id": "63b7b10efac0fba0d5e1d187",
    "name": "Strange Love",
    "lyrics": [
      "Everybody wants to know\nIf we fucked on the bathroom sink",
      "How your hands felt in my hair\nIf we were high on amphetamines",
      "And everybody wants to hear\nHow we chain-smoked until three",
      "And how you laughed when you said my name\nAnd how you gripped my hips so mean",
     ...
    ]
  }
```





## Authors

- [@ferb7o2](https://www.github.com/ferb7o2)

