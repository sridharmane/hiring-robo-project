import { CandidateRepoPage } from './app.po';

describe('candidate-repo App', () => {
  let page: CandidateRepoPage;

  beforeEach(() => {
    page = new CandidateRepoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
