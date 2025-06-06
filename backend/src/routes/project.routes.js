const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject,
  addMember,
  updateMemberRole,
  removeMember,
  getProjectAnalytics,
  updateProjectStatus,
  inviteMember,
  getProjectActivity
} = require('../controllers/project.controller');
const { protect } = require('../middleware/auth/auth');

// Apply protection to all routes
router.use(protect);

// Task routes
const taskRouter = require('./task.routes');
router.use('/:projectId/tasks', taskRouter);

// Discussion routes
const discussionRouter = require('./discussion.routes');
router.use('/:projectId/discussions', discussionRouter);

// Milestone routes
const milestoneRouter = require('./milestone.routes');
router.use('/:projectId/milestones', milestoneRouter);

// Communication routes
const communicationRouter = require('./communication.routes');
router.use('/:projectId/messages', communicationRouter);

// File routes
const fileRouter = require('./file.routes');
router.use('/:projectId/files', fileRouter);

// Notification routes for projects
const { 
  getProjectNotifications,
  updateProjectNotificationPreferences,
  getProjectNotificationPreferences,
  markProjectNotificationsAsRead,
  getProjectNotificationStats,
  createProjectNotification
} = require('../controllers/notification.controller');

router.get('/:projectId/notifications', getProjectNotifications);
router.post('/:projectId/notifications', createProjectNotification);
router.get('/:projectId/notifications/stats', getProjectNotificationStats);
router.get('/:projectId/notifications/preferences', getProjectNotificationPreferences);
router.put('/:projectId/notifications/preferences', updateProjectNotificationPreferences);
router.put('/:projectId/notifications/mark-read', markProjectNotificationsAsRead);

// Project routes
router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

// Enhanced project routes for widgets
router.get('/:id/analytics', getProjectAnalytics);
router.put('/:id/status', updateProjectStatus);
router.get('/:id/activity', getProjectActivity);

// Member management routes
router.post('/:id/members', addMember);
router.post('/:id/invite', inviteMember);
router.put('/:id/members/:memberId', updateMemberRole);
router.delete('/:id/members/:memberId', removeMember);

module.exports = router;
