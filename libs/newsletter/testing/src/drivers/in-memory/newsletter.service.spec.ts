import { TestBed } from '@angular/core/testing';

import { DaffInMemoryNewsletterService } from './newsletter.service';
import { DaffNewsletterSubmission } from '@daffodil/newsletter';
import { DaffNewsletterUnion } from '@daffodil/newsletter';
import { cold } from 'jasmine-marbles';


describe('Driver | InMemory | Newsletter | NewsletterService', () => {
  let newsletterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DaffInMemoryNewsletterService
      ]
    });
    newsletterService = TestBed.get(DaffInMemoryNewsletterService);
  });

  it('should be created', () => {
    expect(newsletterService).toBeTruthy();
  });
  describe('send', () => {

    it('should send a submission and return an observable of the same type', () => {
      const newsletterSubmission: DaffNewsletterSubmission = { email: 'test@email.com' };
      const response = cold('(a|)', {a: newsletterSubmission});

      expect(newsletterService.send(newsletterSubmission)).toBeObservable(response);
    });
    it('should send a submission an extended DaffNewsletter Submission and return an observable of the same type', () => {
      const newsletterSubmission: DaffNewsletterUnion = { email: 'test@email.com', name: 'James Arnold' };
      const response = cold('(a|)', {a: newsletterSubmission});

      expect(newsletterService.send(newsletterSubmission)).toBeObservable(response);
    });


    it('should throw an error when an undefined payload is sent', () => {
      const newsletterSubmission = undefined;
      const response = cold('#', {}, 'Failed to subscribe');

      expect(newsletterService.send(newsletterSubmission)).toBeObservable(response);      
    });
  });

});