import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('check for blog title and author display', () => {

    test('render title and author', () => {
        const blog = {
            title: "Learning React Native",
            author: "Jared Hales",
            url: "http://nextjs.com",
            likes: 1234,
            user: {
                username: "Jared Hales",
                name: "jhales",
            },
        };

        const component = render(
            <Blog blog={blog} />
        )

        
        expect(component.container).toHaveTextContent('Learning React Native')
        expect(component.container).toHaveTextContent('Jared Hales')
        expect(component.container.user).toBeUndefined();
        expect(component.container.likes).toBeUndefined();
    })



})