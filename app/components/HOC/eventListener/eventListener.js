import React, {Component} from 'react';
import T from 'prop-types';
import isArray from 'lodash/isArray';
import omit from 'lodash/omit';
import detectPassiveEvents from 'detect-passive-events';

function eventListenerHOC(WrappedComponent, eventNames) {
	class EventListenerHOC extends Component {
		static propTypes = {
			toggle: T.bool,
			useToggle: T.bool,
			passToggle: T.bool,
			useRequestAnimationFrame: T.bool
		};

		static defaultProps = {
			toggle: false,
			useToggle: false,
			passToggle: false,
			useRequestAnimationFrame: true
		};

		constructor(...args) {
			super(...args);
			const events = isArray(eventNames) ? eventNames : [eventNames];
			events.forEach(eventName => {
				this[`${eventName}_listener`] = this.listener.bind(this, eventName);
				if (this.props.useRequestAnimationFrame) {
					this[`${eventName}_rafListener`] = this.rafListener.bind(this, eventName);
				} else {
					this[`${eventName}_rafListener`] = this[`${eventName}_listener`];
				}
			});
			this.addEventListener = ::this.addEventListener;
			this.removeEventListener = ::this.removeEventListener;
			this.saveRef = ::this.saveRef;
		}

		addEventListener() {
			const events = isArray(eventNames) ? eventNames : [eventNames];
			events.forEach(eventName => {
				this.listener(eventName);
				window.addEventListener(eventName, this[`${eventName}_rafListener`], this.eventOptions);
			});
		}

		removeEventListener() {
			const events = isArray(eventNames) ? eventNames : [eventNames];
			events.forEach(eventName => {
				window.removeEventListener(eventName, this[`${eventName}_rafListener`], this.eventOptions);
			});
		}

		rafListener(eventName) {
			requestAnimationFrame(this.listener.bind(this, eventName));
		}

		listener(eventName) {
			if (this.$component && this.$component[eventName]) {
				this.$component[eventName]();
			}
		}

		componentDidMount() {
			this.eventOptions = detectPassiveEvents.hasSupport === true ? {capture: false, passive: true} : false;
			if (!this.props.useToggle) {
				return this.addEventListener();
			}
			if (this.props.useToggle && this.props.toggle) {
				return this.addEventListener();
			}
		}

		componentDidUpdate({toggle}) {
			if (!this.props.useToggle) {
				return;
			}
			if (toggle !== this.props.toggle) {
				if (this.props.toggle) { // should enable
					this.addEventListener();
				} else {
					this.removeEventListener();
				}
			}
		}

		componentWillUnmount() {
			this.removeEventListener();
		}

		saveRef(wrappedComponentInstance) {
			this.$component = wrappedComponentInstance;
		}

		render() {
			const props = {...omit(this.props, [this.props.passToggle ? '' : 'toggle', 'useToggle', 'useRequestAnimationFrame']), ref: this.saveRef};
			return <WrappedComponent {...props}/>;
		}
	}

	// pass page field to wrapper component
	if (WrappedComponent.page) {
		EventListenerHOC.page = WrappedComponent.page;
	}
	return EventListenerHOC;
}

export default eventListenerHOC;
