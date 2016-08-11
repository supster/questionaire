Quartet Health Code Challenge
=============================

Instruction
-----------

We'd like to see your implementation of a react app that fulfills the users stories below. We're primarily interested in your code fluency and quality of your patterns, and much less so on your design skills, but demonstrating a sense of design is a plus. Feel free to use whatever libraries you want, and don't worry about user login/authentication or any backend store. Please push your code to a github repo or reply with a tarball; make sure to include a README with instructions on how to build / deploy locally and how you approached this exercise. Comments in your source code are also encouraged. If you have any questions on the instructions or expectations, please don't hesitate to ask!

Stories:
1) As a patient I want to take the PHQ-9 depression screener through my phone (mobile-friendly site) and get the assessment score and what that means.

Implementation Notes - You can find the 9 questions and the scoring legend here: http://patient.info/doctor/patient-health-questionnaire-phq-9 *Note that the answer choices correspond to numeric values:
0: Not at all
1: Several days
2: More than half the days in the week
3: Nearly every day

2) As a patient, if I score moderate depression or higher, I want to be presented with three options for therapists that I can select from.

Implementation Notes - You can just show three fake therapist names and have some input that allows the user to select one and hit submit with some thank you message.


Environment Setup
-----------------

#### Clone the repository

    git clone git@github.com:supster/phq-9.git

#### Install nvm (node version manager)

Used to manage the version of node. See [installation](https://github.com/creationix/nvm#installation) or use the one line install:

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

#### Install node

From inside the repository directory, run:

    nvm install

#### Install dependencies

From inside the repository directory, run:

    npm install

Build and Run
--------------

#### `gulp run`

Build the project, watch changes, and start a server on <a href="http://localhost:3000/">http://localhost:3000/</a>.

Assumption
-------------

* When a user scores more than 9 points, 'Get Help' button appears.
* A user doesn't need to complete the questionnaire for score and/or 'Get Help' button to show up.

Approach
-------------

* I decided build a generic questionnaire form, so I designed to components and objects as such.
* Qestions could be supplied from a json file or an API endpoint.
* Since I didn't create an API, data is supplied from `src/test/fixture/questions.json`.
* Most interactions occur when users click on the radio buttons which reside in `Question` component.  The component dispatch an `UPDATE_SCORE` action which results in a state change in `ScoreBar` component.
* Source code lives under src folder.
* Files in the src folder gets compiled and copied into the target folder.
* Redux is used to handle state and data.
* I use Bootstrap grid system to make the page responsive.
* I use react router to navigate from `Questionnaire` to `GetHelpPage`, since we only need to show fake data.