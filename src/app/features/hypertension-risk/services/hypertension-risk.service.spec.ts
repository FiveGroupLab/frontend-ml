import { TestBed } from "@angular/core/testing";

import { HypertensionRiskService } from "./hypertension-risk.service";

describe("HypertensionRiskService", () => {
  let service: HypertensionRiskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HypertensionRiskService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
