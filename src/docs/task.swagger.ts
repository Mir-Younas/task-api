/**
 * @openapi
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: Complete Task API
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 1000
 *                 example: Complete Swagger documentation for the Task API
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - in-progress
 *                   - completed
 *                 default: pending
 *                 example: pending
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User account is blocked
 *
 *   get:
 *     summary: Fetch all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User account is blocked
 *
 * /api/tasks/{taskId}:
 *   get:
 *     summary: Fetch a task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB task ID
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *       400:
 *         description: Invalid task ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User account is blocked
 *       404:
 *         description: Task not found
 *
 *   patch:
 *     summary: Update a task
 *     description: The task author or an admin can update the task.
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: Updated Task API
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 1000
 *                 example: Update and test the Task API documentation
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - in-progress
 *                   - completed
 *                 example: completed
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid request data or task ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not allowed to update this task
 *       404:
 *         description: Task not found
 *
 *   delete:
 *     summary: Delete a task
 *     description: The task author or an admin can delete the task.
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid task ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not allowed to delete this task
 *       404:
 *         description: Task not found
 */

export {};