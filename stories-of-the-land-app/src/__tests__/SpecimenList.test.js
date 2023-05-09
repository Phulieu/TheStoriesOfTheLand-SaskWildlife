import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { SpecimenList } from "../views";
import apiCalls from "../api";

jest.mock("../api");

describe("SpecimenList", () => {
  const mockSpecimens = [
    {
      _id: "1",
      plantName: "Specimen 1",
      image: "/image1.jpg",
      story: "Story 1",
    },
    {
      _id: "2",
      plantName: "Specimen 2",
      image: "/image2.jpg",
      story: "Story 2",
    },
  ];

  beforeEach(() => {
    apiCalls.getAllPlants.mockResolvedValue({ data: { data: mockSpecimens } });
  });

  test("displays a list of specimens", async () => {
    render(<MemoryRouter> {/* wrap SpecimenList in MemoryRouter */}
    <SpecimenList />
  </MemoryRouter>);
    const specimen1 = await screen.findByText("Specimen 1");
    expect(specimen1).toBeInTheDocument();
    const specimen2 = await screen.findByText("Specimen 2");
    expect(specimen2).toBeInTheDocument();
  });

  test("displays a modal when a specimen is clicked", async () => {
    render(
      <MemoryRouter>
        {/* wrap SpecimenList in MemoryRouter */}
        <SpecimenList />
      </MemoryRouter>
    );
    const specimen1List = await screen.findAllByText("Specimen 1");
    const specimen1 = specimen1List[0];
    fireEvent.click(specimen1);
    const modalTitle = await screen.findAllByText("Specimen 1");
    expect(modalTitle[0]).toBeInTheDocument();
    const modalImage = await screen.findByAltText("the specimen");
    expect(modalImage).toHaveAttribute(
      "src",
      "http://localhost:3001/image1.jpg"
    );
    const modalStory = await screen.findByText("Story 1");
    expect(modalStory).toBeInTheDocument();
  });
});
