var expect = require('expect')
var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-addons-test-utils')
var $ = require('jQuery')

var CountdownForm = require('CountdownForm')

describe('CountdownForm', () => {
  it('should exist', () => {
    expect(CountdownForm).toExist()
  })

  it('should call onSetCountdown if valid seconds entered', () => {
    var secs = undefined
    var setSpy = expect.createSpy((seconds) => {
      secs = seconds
    }).andCallThrough()
    var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={setSpy}/>)
    var $el = $(ReactDOM.findDOMNode(countdownForm))

    countdownForm.refs.seconds.value = '109'
    TestUtils.Simulate.submit($el.find('form')[0])

    expect(secs).toBe(109)
  })

  it('should not call onSetCountdown if invalid seconds entered', () => {
    var spy = expect.createSpy()
    var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>)
    var $el = $(ReactDOM.findDOMNode(countdownForm))

    countdownForm.refs.seconds.value = '109b'
    TestUtils.Simulate.submit($el.find('form')[0])

    expect(spy).toNotHaveBeenCalled()
  })
})
