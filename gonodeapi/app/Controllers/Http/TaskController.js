'use strict'
const Task = use('App/Models/Task')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {

  async index({ params, request, response, view }) {

    const task = await Task.query().where('project_id', params.project_id).with('user').fetch()

    return task
  }


  async store({ params, request }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    const task = await Task.create({ ...data, project_id: params.project_id })
  }


  async show({ params }) {

    const task = await Task.findOrFail(params.id)

    return task
  }


  async update({ params, request, response }) {

    const task = await Task.findOrFail(params.id)

    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    task.merge(data)
    await task.save()

    return task

  }

  async destroy({ params }) {

    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}

module.exports = TaskController
