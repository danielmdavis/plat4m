
# Plat4m: The Platform for Platforms

Plat4m is a tool built for communities of thought such as political parties and advocacy groups to draft their formal program democratically. Submit your ideas to be voted on and ammended by your peers. 

![plat4m in the wild](./ui.gif)

# How to use

### Deploy Locally

To start using Plat4m, simply clone this repository and run `npm start` from the root directory.

### Submit a Proposition

To propose a new idea, scroll to the bottom and enter your idea in the textbox and click submit.

### Cast a Vote

To cast a simple vote for either a proposition or ammendment, click `Yes` or `No`. An ammendment or proposition passes or fails once a majority of nine voters has voted in either direction.

### Ammend a Proposition

To ammend a proposition, click `Yes And` or `No But`. These coorespond to the two types of addenda.

#### Predicate Addendum

A predicate addendum is an addendum that indicates the person proposing it doesn't support the idea in its current form, but would if their addendum were passed. Thus when a predicate addendum passes or fails, a vote for or against the proposition respectively will be automatically cast. 

#### Non-Predicate Addendum

A non-predicate addendum is one attached to an idea the voter supports whether or not the ammendment passes.

### Results Screen

Click the button at the top that says `Our Story So Far` to see a full list of ideas the voters have endorsed.

#### Other Features

- Click the `Show Failed` toggle to see propositions and addenda that have been voted down. 
- Change the total size of the electorate with the `Quorum` textbox. 
- Toggle the `Users Guide` accordion to learn how to get started.

### Features to Add

- User Login: Replace honor system with email-based login system to enforce "one user one vote."
- Switch between multiple institutions drafting their own statements of purpose in parallel




