export function triggerProcess() {
  // This is a mock implementation of the processes that are triggered by the consumer
  sendDataToGrafana();
  sendDataToSegment();
  sendDataToSplunk();
  sendDataToBeamer();
}

function sendDataToGrafana() {
  console.log("sending data to grafana");
}

function sendDataToSegment() {
  console.log("sending data to segment");
}

function sendDataToSplunk() {
  console.log("sending data to splunk");
}

function sendDataToBeamer() {
  console.log("sending data to beamer");
}
