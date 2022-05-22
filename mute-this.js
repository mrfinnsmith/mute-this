const targetLabel = 'mute-this' // Change this to whatever label name you want to use.

// main is the first function to run and calls the other functions.
function main() {
  let threads = getThreads(targetLabel);
  if (threads.length == 0) return;

  let query = '}';
  for (i in threads) {
    query = ' from: ' + threads[i].getMessages()[0].getFrom().replace(/^.+<([^>]+)>$/, "$1") + query;
  }
  query = '{' + query.slice(1);
  // Check if there is a filter already, using Properties ( Properties.setProperties(properties))
  // if there isn't a filter already, make one
  
  const scriptProperities = PropertiesService.getScriptProperties();
  let targetFilterId = scriptProperities.getProperty('mute-this');
  
  makeFilter(targetFilterId);
}

// getThreads goes and gets all the email threads that have the target label (set at the top of this script). It returns an array of those threads.
function getThreads(targetLabelName){
  let targetLabel = GmailApp.getUserLabelByName(targetLabelName);
  targetLabel =  targetLabel ? targetLabel : GmailApp.createLabel(targetLabelName);

  let targetThreads = targetLabel.getThreads();

  return targetThreads;
}

function makeFilter() {
  // Make a filter using Gmail.users.settings.filters.create
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