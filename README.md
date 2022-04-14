# Yelp Guesser

## A Restaurant-Themed Guessing Game

### Developed by Mily Wendland, Nick Lopez, and Brad Lewis

---

<img src='https://technofaq.org/wp-content/uploads/2018/08/yelp-logo-600x493.jpg' width='200'>

---

## Concept

The gameplay of the app is inspired by the popular game [GeoGuessr](https://www.geoguessr.com/), where players are shown an image from Google Street View of a random world location, and try to guess where it is. In our version, players are presented images of restaurant meals from the Yelp Fusion API. Based on the appearance of the food in the image, players guess the Yelp star rating of its restaurant. After viewing 5 images and making 5 guesses, a player's score is calculated.

---

## App Structure

To play Yelp Guesser, users need to register for an account. Once they have created their account, they need to be logged in to play the game. Every gameplay attempt generates a score for the user. These scores are compared against all others in the database. The Leaderboard page of the app shows the top 5 scores for the user, top 5 in the user's area, and top 5 in the world.

---

## Entity Relation Diagram

![ERD](/diagrams/ERD.png)

---

## Component Hierarchy Diagram

![Component Hierarchy Diagram](/diagrams/ComponentHierarchyDiagram.png)
