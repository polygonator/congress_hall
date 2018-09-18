import React, {PureComponent} from 'react';
import T from 'prop-types';
import {connect} from 'react-redux';
import get from 'lodash/get';
import match from 'switch-match';
import cx from 'classnames';
import styles from './Popup.css';
import VerticalAlignContainer from 'Grid/VerticalAlignContainer';
import {getScrollTop, overflowY} from 'utils/dom';
import {isEntered, isExited} from 'utils/transition';
import {safeGet} from 'utils/safeGet';
import {actions as popupsActions} from 'reducers/popups';
import {actions as commonActions} from 'reducers/common';

class Popup extends PureComponent {
	static propTypes = {
		status: T.string.isRequired,
		location: T.object.isRequired,
		popups: T.object.isRequired,
		saveScrollTop: T.func.isRequired,
		onClose: T.func.isRequired,
		scrollTop: T.number
	};

	static defaultProps = {
		scrollTop: 0
	};

	constructor(...args) {
		super(...args);
		this.setOnCloseOptions = ::this.setOnCloseOptions;
		this.handleOnClose = ::this.handleOnClose;
		this.handleKeydown = ::this.handleKeydown;
		this.handleOverlayClick = ::this.handleOverlayClick;
		this.state = Popup.initState(this.props);
	}

	static initState({popups}) {
		return {
			onCloseOptions: {},
			popup: popups.options.popup,
			fixToBottom: get(popups, 'options.fixToBottom', false),
			hideCloseButton: get(popups, 'options.hideCloseButton', false),
			noDisableOverlow: get(popups, 'options.noDisableOverlow', false),
			inheritHeight: get(popups, 'options.inheritHeight', false),
			inheritWidth: get(popups, 'options.inheritWidth', false)
		};
	}

	componentDidMount() {
		const {saveScrollTop} = this.props;
		if (saveScrollTop) {
			saveScrollTop(getScrollTop());
		}
		// overflowY(true);
		window.addEventListener('keydown', this.handleKeydown, false);
		this.pathname = this.props.location.pathname;
	}

	componentWillUnmount() {
		if (!this.state.noDisableOverlow) {
			// overflowY(false);
			const {scrollTop} = this.props;
			const pathnameIsSame = this.pathname === this.props.location.pathname;
			if (pathnameIsSame && scrollTop && !safeGet(this.props, 'popups.options.noRestoreScroll', false)) {
				setTimeout(() => {
					window.scrollTo(0, scrollTop);
				}, 0);
			}
		}
		window.removeEventListener('keydown', this.handleKeydown, false);
	}

	static getDerivedStateFromProps(props, state) {
		const prevPopup = state.popup;
		const {popups: {options: {popup: nextPopup}}} = props;
		if (prevPopup !== nextPopup) {
			return Popup.initState(props);
		}
		return null;
	}

	componentDidUpdate(prevProps) {
		const {status, location} = prevProps;
		const {status: nextStatus, location: nextLocation} = this.props;
		if (location.pathname !== nextLocation.pathname) {
			this.handleOnClose();
		}

		if (status !== nextStatus) {
			if (isEntered(nextStatus)) {
				overflowY(true);
			}
			if (isExited(nextStatus)) {
				overflowY(false);
			}
		}
	}

	render() {
		const {status, popups: {options}} = this.props;
		const {popup, inheritHeight, inheritWidth, fixToBottom, hideCloseButton} = this.state;
		const popupOptions = {options, onClose: this.handleOnClose, setOnCloseOptions: this.setOnCloseOptions}; // eslint-disable-line no-unused-vars
		const overlayClasses = cx(
			'popup-overlay',
			`popup-${status}`,
			styles.overlay,
			{
				[styles.fadeTransition]: options.fadeTransition
			});
		const popupClasses = cx(styles.popup, {
			popup: !inheritHeight, // if inheritHeight set to true, then popup class should be set inside certain popup screen component, like in moodboardNewImage
			[styles.inheritHeight]: inheritHeight,
			[styles.inheritWidth]: inheritWidth
		});
		return (
			<VerticalAlignContainer
				fixToBottom={fixToBottom}
				inheritHeight={inheritHeight}
				className={overlayClasses}
				childrenWrapperClassName={styles.wrapper}
				onClickCapture={this.handleOverlayClick}
			>
				<div className={popupClasses} id="popup">
					{match(popup, {
						// next row just as example
						// somePopup: () => <SomePopupComponent {...popupOptions}/>
					}, null)}
					{hideCloseButton ? null : <button type="button" className={styles.close} onClick={this.handleOnClose}/>}
				</div>
			</VerticalAlignContainer>
		);
	}

	handleKeydown(e) {
		if (e.keyCode === 27) {
			this.handleOnClose();
		}
	}

	handleOverlayClick(e) {
		let parent = e.target;
		let shouldClose = true;
		while (parent && shouldClose && !parent.classList.contains('popup-overlay')) {
			if (parent.classList && parent.classList.contains('popup')) {
				shouldClose = false;
			}
			parent = parent.parentNode;
		}
		if (shouldClose) {
			this.handleOnClose();
		}
	}

	setOnCloseOptions(onCloseOptions) {
		this.setState({onCloseOptions});
	}

	handleOnClose() {
		if (get(this.props, 'popups.options.onClose')) {
			return this.props.popups.options.onClose(this.state.onCloseOptions);
		}
		if (get(this.props, 'popups.options.onCloseCallback')) {
			this.props.popups.options.onCloseCallback(this.state.onCloseOptions);
		}
		this.props.onClose();
	}
}

const mapStateToProps = ({popups, common}) => ({popups, scrollTop: common.scrollTop});
const mapDispatchToProps = dispatch => ({
	saveScrollTop: value => dispatch(commonActions.saveScrollTop(value)),
	onClose: () => dispatch(popupsActions.set(false, {}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
