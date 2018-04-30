// enzyme is used to isolate unit tests for react components
// shallow is used to render react components
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 <NavigationItem /> elements if authenticated', ()=>{
        //wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render a logout element if authenticated', ()=>{
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});