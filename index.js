module.exports = (robot) => {
  robot.log('Yay, the app was loaded!');

  robot.on('issues.opened', async context => {
    robot.log('An issue was opened: ', context.payload.issue.title);
  });
};
