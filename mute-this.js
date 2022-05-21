const muteLabel = 'mute-this' // Change this to whatever label name you want to use.

// main is the first function to run and calls the other functions.
function main() {
  let threads = getThreads();
  
  // Check if there are any threads. if not, return.

  // Check if there is a filter already, using Properties ( Properties.setProperties(properties))
  // if there isn't a filter already, make one
  makeFilter();
  
  // loop through the threads, get the sender.
  // add each sender to an array, so that you don't repeat work
  // for each sender in the array, add to the filter
  editFilter();

}

// getThreads goes and gets all the email threads that have the target label (set at the top of this script). It returns an array of those threads.
function getThreads(targetLabel){
  // 1. loop through all labels?
  // 2. once you have the target label, getThreads()
  return targetThreads;
}

function makeFilter() {
  // Make a filter using Gmail.users.settings.filters.create
}

function editFilter() {
  // may need to copy the contents of the filter, then make a new one with the addition of the new sender.
  // if so, may be better to make a single copy/new/delete with all the senders.
}