import { interval, Subject } from "rxjs";
import { take, map, delay } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";

import createConnection from "./connectObservable";

// socket connection stream tests...
describe("socket connection", () => {
  const source$ = new Subject();
  const out$ = createConnection(source$).subject;

  it("should emit mapped data", (done) => {
    const expected = [12, 13];
    let index = 0;
    out$.subscribe((v) => {
      expect(v).toEqual(expected[index]);

      if (index === 1) {
        done();
      }
      index++;
    });
    source$.next({ data: 12 });
    source$.next({ data: 13 });
  });
});

// without marble testing
test("observable test", (done) => {
  const ob$ = interval(100).pipe(take(4));

  const testObserver = {
    arr: [],
    next: (v) => {
      testObserver.arr.push(v);
    },
    complete: () => {
      expect(testObserver.arr).toStrictEqual([0, 1, 2, 3]);
      done();
    },
  };
  ob$.subscribe(testObserver);
});

// marble testing
// https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/testing/marble-testing.md#time-progression-syntax
test("scheduler", () => {
  const scheduler = new TestScheduler((actual, expected) => {
    // required for deep equality checks..
    expect(actual).toEqual(expected);
  });

  scheduler.run(({ expectObservable }) => {
    const expectedMarble = "- 100ms a 99ms b 99ms c 99ms (d|)";
    const observableInTest = interval(100).pipe(
      delay(1),
      map((i) => i * 10),
      take(4)
    );
    expectObservable(observableInTest).toBe(expectedMarble, {
      a: 0,
      b: 10,
      c: 20,
      d: 30,
    });
  });
});
