# What this is
Do you get a lot of unsolicited emails from salespeople? This project allows you to permanently "mute" any new emails you get from a person just by applying a label to one of their emails.

# How to use (without git)
1. Paste it into a new Google Apps Script project.
1. Run it at least once to grant it permission to access your email.
1. Set [a trigger](https://developers.google.com/apps-script/guides/triggers) to run as frequently as you want.
1. Done. Now when you apply the label "mute-this" to an email, the project will add the sender to a filter that filters out al their future emails.

# How to use (with git)
1. Install [clasp](https://developers.google.com/apps-script/guides/clasp).
1. Make [a new Script file](https://script.new).
1. Get the Script ID from your new project. At the time of writing, you can find it in the settings on the left side of the IDE.
1. `git clone https://github.com/mrfinnsmith/mute-this`
1. `cp .clasp.json.template .clasp.json`
1. Fill in the details of your project in .clasp.json. The script ID is the one you grabbed above. The path should be from the root of your computer to the directory mute-this.
1. `clasp push` (If you've entered the correct details in .clasp.json, this should push *mute-this* into your new Script project.)
1. Run main() in the GAS IDE. It will ask for permissions, so say yes.
1. Set [a trigger](https://developers.google.com/apps-script/guides/triggers) to run this script as often as you'd like.

# Things to know
* You can configure the name of the label at the top of the script. It's hard coded as *mute-this*, but if you have another label you'd like to use, you can change it. Just be 100% that you want to mute any sender that you've given that label.