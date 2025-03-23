### Before optimization

#### Actions during profiling:

- Filtering data by region.
- Search for countries by name.
- Sort countries by population.

#### Parameters to Check:
- Commit Duration: 2.8s
- Render Duration: 6ms
- Interactions: Filtering data by region.
- Flame Graph: 

  ![alt text](./public/image.png)
- Ranked Chart: 

  ![alt text](./public/image-1.png)

***
- Commit Duration: 7.1s
- Render Duration: 29ms
- Interactions: Search.
- Flame Graph: 

  ![alt text](./public/image-2.png)
- Ranked Chart: 

  ![alt text](./public/image-3.png)

***
- Commit Duration: 3.3s
- Render Duration: 26ms
- Interactions: Sort.
- Flame Graph: 

  ![alt text](./public/image-4.png)
- Ranked Chart: 

  ![alt text](./public/image-5.png)


### After optimization

#### Actions during profiling:

- Filtering data by region.
- Search for countries by name.
- Sort countries by population.

#### Parameters to Check:
- Commit Duration: 2.6s
- Render Duration: 1ms
- Interactions: Filtering data by region.
- Flame Graph: 

  ![alt text](./public/image-7.png)
- Ranked Chart: 

  ![alt text](./public/image-8.png)

***
- Commit Duration: 1.8s
- Render Duration: <0.1ms
- Interactions: Search.
- Flame Graph: 

  ![alt text](./public/image-9.png)
- Ranked Chart: 

  ![alt text](./public/image-10.png)

***
- Commit Duration: 3.1s
- Render Duration: 3ms
- Interactions: Sort.
- Flame Graph: 

  ![alt text](./public/image-11.png)
- Ranked Chart: 

  ![alt text](./public/image-12.png)
