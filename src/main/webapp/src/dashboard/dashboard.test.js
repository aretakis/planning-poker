import React from 'react';
import Dashboard from './Dashboard';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../redux/store';
import * as Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

it('should render correctly with no props', () => {

    const component = shallow(<Dashboard store={store}></Dashboard>);

    expect(component).toMatchSnapshot();
});