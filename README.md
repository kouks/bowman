# Bowman Project
> Pavel Koch

## About
Bowman is a classic flash game, where the goal is to either shoot at other players or a target. Clicking and moving your mouse allows you to adjust power and angle of the arrow. There are, however, other factors that reflect on the trajectory of the projectile - like wind and walls. My implementation in _JavaScript_ allows shooting at targets and even creating your own scenarios.

## Technologies
I used multiple technologies to help me with the implementation. The most impactful one is Vue.js, which is a lightweight and elegant _JavaScript_ framework that allows you to create components to organize your application.

## Structure
### Game
The most important component that my application includes is a without a doubt `Game` component. This component has a _JavaScript_ canvas, on which the game is rendered. It is also dependant on many other classes, that provide crucial functionality.
### Collider
This class is responsible for registering all objects present in the scenario, and upon request, determines whether the projectile collides with any of them.
### Terrain
Class responsible for holding information about a specific objects, like its dimensions. Instances of this class are also registered to `Collider` and have a self-rendering function.
### Ballistics and Trajectory
Class that holds the functionality to calculate a trajectory of projectile. It is used by the `Trajectory` class, that holds the information.
### Projectile
This class is responsible for retrieving data from the `Trajectory` class and animating a projectile over provided trajectory.

## Editor
This component allows you to create your own scenarios by drawing them on a _JavaScript_ canvas, using provided tools that set the color or the score you get, when you hit given object.


## Menu
A simple menu component, that serves as an index page of the game.


## Scenarios
This component renders a page, that shows all available scenarios and lets you play them. It is also responsible for showing the high scores for each scenario.


## Auth
This group of components handles auth actions like logging in, registering and logging out.


## Storage
This group includes classes that handle actions concerning the _HTML_ storage, as well as a simple _ORM_ to help out with simple _CRUD_ operations.
