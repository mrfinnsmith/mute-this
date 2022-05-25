const targetLabelName = 'mute-this' // Change this to whatever label name you want to use.

// main is the first function to run and calls the other functions.
function main() {
    let threads = getThreads(targetLabelName);
    if (threads.length == 0) return;
    
    const scriptProperities = PropertiesService.getScriptProperties();
    let targetFilterId = scriptProperities.getProperty(targetLabelName);

    const newFilterObject = new FilterObject(targetFilterId);

    const newFilter = newFilterObject.makeFilter();
        
    for (i in threads) {
        newFilterObject.query = newFilterObject.query + ' from: ' + threads[i].getMessages()[0].getFrom().replace(/^.+<([^>]+)>$/, "$1");
    }
    newFilterObject.query = newFilterObject.query + ' }';

    if (targetFilterId !== null) {
      Gmail.Users.Settings.Filters.remove(targetFilterId);
      scriptProperities.deleteProperty(targetFilterId);
    }
    scriptProperities.setProperty(targetLabelName, newFilter.id);

}

// getThreads goes and gets all the email threads that have the target label (set at the top of this script). It returns an array of those threads.
function getThreads(targetLabelName) {
    let targetLabel = GmailApp.getUserLabelByName(targetLabelName);
    targetLabel = targetLabel ? targetLabel : GmailApp.createLabel(targetLabelName);

    let targetThreads = targetLabel.getThreads();

    return targetThreads;
}

function FilterObject(filterId) {
    // Make a filter using Gmail.users.settings.filters.create
    this.query = filterId === null ? '{' : Gmail.Users.Settings.Filters.get('me', filterId).criteria.query.slice(0, -1);
    this.makeFilter = function() {
      let filter = Gmail.newFilter();
      filter.criteria = Gmail.newFilterCriteria();
      filter.criteria.query = this.query;

      filter.action = Gmail.newFilterAction();
      filter.action.removeLabelIds=['INBOX', 'IMPORTANT', 'UNREAD']

      return Gmail.Users.Settings.Filters.create(filter, 'me');
    }
  }

function setProperty() {
    PropertiesService.getScriptProperties().setProperty('filterId', 'ANe1BmhLohezw3s1QGhTYL0AVs2kPAvWQmpnzd--4WNeCoV0pSMwwUsVxwtCCZvMsohbbTXs_Q');
}
function filtrer() {
    let filterId = PropertiesService.getScriptProperties().getProperty('filterId');
    let oldFilter = Gmail.Users.Settings.Filters.get('me', filterId);
    let oldFilterId = oldFilter.id;

    Gmail.Users.Settings.Filters.remove('me', oldFilterId);

    let newFilter = Gmail.newFilter();

    newFilter.criteria = Gmail.newFilterCriteria();
    newFilter.criteria.query = oldFilter.criteria.query.replace('}', ' from:mcdonalds}')

    newFilter.action = Gmail.newFilterAction();
    newFilter.action = oldFilter.action;

    newFilter.id = oldFilterId; // This doesn't work

    let me = Session.getEffectiveUser().getEmail();

    Gmail.Users.Settings.Filters.create(newFilter, me)

    let allFilters = Gmail.Users.Settings.Filters.list('me').filter;
    for (i in allFilters) {
        if (typeof allFilters[i].criteria.query !== 'undefined') {
            if (allFilters[i].criteria.query.includes('buzzfeed')) {
                console.log(allFilters[i])
            }
        }
    }
}