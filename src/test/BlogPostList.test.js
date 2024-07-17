import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogPostList from '../components/BlogPostList';

test('renders BlogPostList component and fetches posts', async () => {
  const mock = new MockAdapter(axios);
  const mockData = {
    articles: [
      {
        title: 'Test Post 1',
        description: 'This is a test description for post 1',
        publishedAt: '2024-07-16T00:00:00Z',
        urlToImage: 'test-image-url-1',
      },
      {
        title: 'Test Post 2',
        description: 'This is a test description for post 2',
        publishedAt: '2024-07-16T00:00:00Z',
        urlToImage: 'test-image-url-2',
      },
    ],
    totalResults: 2,
  };
  
  mock.onGet(/newsapi\.org\/v2\/everything/).reply(200, mockData);

  render(
    <Router>
      <BlogPostList />
    </Router>
  );
  
  expect(await screen.findByText('Test Post 1')).toBeInTheDocument();
  expect(await screen.findByText('Test Post 2')).toBeInTheDocument();
});
