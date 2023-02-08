# nhl-etl-pipeline
 > Sportradar coding challenge, create etl pipeline from nhl api

Contains three forms to query an NHL API for team or player information. 
All queries use endpoint: https://statsapi.web.nhl.com/api/v1
Based on requirements from: https://github.com/sportradarus/sportradar-api-challenge

* **Team Pipeline** - Provide a team id and season year which outputs a CSV file. The CSV should include the following:
  * Team ID
  * Team Name
  * Team Venue Name
  * Games Played
  * Wins
  * Losses
  * Points
  * Goals Per Game
  * Game Date of First Game of Season
  * Opponent Name in First Game of Season


* **Player Pipeline** - Provide a player id and season year which outputs a CSV file. The CSV should include the following:
  * Player ID
  * Player Name
  * Current Team
  * Player Age
  * Player Number
  * Player Position
  * If the player is a rookie
  * Assists
  * Goals
  * Games
  * Hits
  * Points

The third form returns the same csv information as the Team Pipeline, but uses dropdown menus instead of text inputs. If the team was franchised under a different name, the csv will display information the following information for the team that existed at the time:

  * Games Played
  * Wins
  * Losses
  * Points
  * Goals Per Game
  * Game Date of First Game of Season
  * Opponent Name in First Game of Season

## Requirements

For development, you will only need Node.js installed in your environement.

## Install

    $ git clone https://github.com/pritckat/nhl-etl-pipeline.git
    $ cd nhl-etl-pipeline
    $ npm install

## Running the project

    $ npm start

## Testing

I've never actually written tests before and am not terribly confident in my abiility to write tests for a server. Advice would be very much appreciated here.

    $ npm test