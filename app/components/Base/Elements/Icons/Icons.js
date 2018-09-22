import React, {PureComponent} from 'react';
import T from 'prop-types';
import match from 'switch-match';

const LogoWhite = props => (
	<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="179" height="75" viewBox="0 0 179 75" {...props}>
		<image width="179" height="75" xlinkHref="data:img/png;base64,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"/>
	</svg>
);
const LogoGold = props => (
	<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="179" height="75" viewBox="0 0 179 75" {...props}>
		<image width="179" height="75" xlinkHref="data:img/png;base64,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"/>
	</svg>
);
const Collaboration = props => (
	<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="64" height="64" viewBox="0 0 64 64" {...props}>
		<image width="64" height="64" xlinkHref="data:img/png;base64,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"/>
	</svg>
);

const Itinerary = props => (
	<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="64" height="64" viewBox="0 0 64 64" {...props}>
		<image width="64" height="64" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC3FBMVEXGnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG0AAADhYO0BAAAA8nRSTlMAEGGevsKwgDMKhfTEH9XupHlwi877axjg+HYJOMu67zYBPnqHXxMHq1BHIMfzZ8y/rBT+wKrn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"/>
	</svg>
);

const Speaker = props => (
	<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="64" height="64" viewBox="0 0 64 64" {...props}>
		<image width="64" height="64" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABiVBMVEXGnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG0AAAC1K6W6AAAAgXRSTlMAATyIuNBL1Qab/seFaAWyKI9uOXW3xhxEXukCirCgl5mafcBG9w9IB+9x7RrmyQrK6BBB+s0j+8iLKedDz9d//b/T7IC6kwODuyp4DB5QZyGYlVq1qOIISfwgGVgVpaKExHJk0XTZV+BA8E7hkAQNYB9fzpL2wg6WFstrNozkcKav/3xeAAAAAWJLR0SCi7P/RAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IJDhMAOEz1oNwAAAK6SURBVFjD5ZXpV9NQEMUnlEApUHYKLXspW7HFIChokVJAsaW4olZF64rKElDZt/ufm9CkTcqL5rUqH7znJOfNnLm/M+e9lwmRtYQSR6koljpKBCpIZeXQVF5WgN1ZAbgqq6qrqypdQIWT1++uAWpqM+tade3mBNQB9bmoHqjj8zcAjca4EWjgAjSh2bT1QjOaePweF1rMmRa4PByAVnh95ozPi1YOQBva81PtaOMAdKAzP9WJDg5AF7rzU93o4gD0wJ+f8qOHA9CLQJ850xdAPwdgYBBD5swQBgc4AORAcNgYDwfh4PFT3xWEwrkwPIKrEheARq9hbFwPxsdwvYXPL5TcAAITk+p6ciIA3HSM8sylWxFtFnlHRrz6XJrqte2/7cJ0NIjITMY5E0Fsdm4amL9jz38XWLhHccQSi8mlpeRiIoY40X1lLj2w5e8FHirfYsamSkWp+1IFPLLh903hsWDwGUhPsPyb4fpUeZ7heYqMRh1E9CKAl1oVW/GZV0TzqNHDc2euAaIVvFYuWcjqUsaBN0RpvNXijDXXANE7vCf6AItrrfhXlHP6iE9kaMHYAPXDq2xmJ5ug+WkVSTK0YGyAPuMLWRF0vxGgtmBsQAMwCVm/CaC0YGxABzAIX7N+E0DlGhrIAs4JpjE/i5B+z02AxNpaggUgYQHrZkD2R2AC0MYGMQHK5LcHMOsSAJuiuFkUQAKkogBOWXYWBbj8TfwXgK1tWVE7vsmaYvguW8mBH/oyjTnlvb1FOyhKOyRiWSxYyxAVgEwFS/4lIJzykC+V8pEnFS4IkMRq5ipbn8tfBrilXRIkSaBdyV0QoOhN/J8A6Y587e2zqvf3LhSmFcAB6xM5ZAEOWZUHdHS8nq8TnLIApzi5UHp8xKr0WwH8ZE9/AHDGGkdntgFRq/ETtXu6Efb8iciM4p+Rg2sCjFR48wAAAABJRU5ErkJggg=="/>
	</svg>
);

const Sportlights = props => (
	<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="68" height="64" viewBox="0 0 68 64" {...props}>
		<image width="68" height="64" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABACAMAAACUXCGWAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC61BMVEXGnG3////GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG3GnG0AAABpJbntAAAA93RSTlMAACOn5y0k1+DeThSS+rlQkG3x+IzlRGDptR9jzgJ+A9RcDEJM47M+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"/>
	</svg>
);

const ChevronDown = props => (
	<svg width="16" height="7" viewBox="0 0 16 7" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M1 0l7 7m7-7L8 7" stroke="#828895" fill="none"/>
	</svg>
);
class Icons extends PureComponent {
	static propTypes = {
		type: T.string
	};

	static defaultProps = {
		type: ''
	};

	render() {
		const {type, ...others} = this.props;
		return match(type, {
			logoWhite: <LogoWhite {...others}/>,
			logoGold: <LogoGold {...others}/>,
			collaboration: <Collaboration {...others}/>,
			itinerary: <Itinerary {...others}/>,
			speaker: <Speaker {...others}/>,
			sportlight: <Sportlights {...others}/>,
			chevronDown: <ChevronDown {...others}/>
		});
	}
}

export default Icons;