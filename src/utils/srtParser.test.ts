import { shiftTime } from "./srtParser"

describe("shiftTime", () => {
  it("shifts time by positive seconds", () => {
    const shiftedTime = shiftTime("00:00:02,880", 5)
    expect(shiftedTime).toBe("00:00:07,880")
  })

  it("shifts time by negative seconds", () => {
    const shiftedTime = shiftTime("00:00:07,880", -5)
    expect(shiftedTime).toBe("00:00:02,880")
  })

  it("shifts time across minute boundary", () => {
    const shiftedTime = shiftTime("00:00:58,000", 3)
    expect(shiftedTime).toBe("00:01:01,000")
  })

  it("shifts time across hour boundary", () => {
    const shiftedTime = shiftTime("00:59:59,000", 3)
    expect(shiftedTime).toBe("01:00:02,000")
  })

  it("handles zero-padded hours and minutes", () => {
    const shiftedTime = shiftTime("01:02:03,000", 60)
    expect(shiftedTime).toBe("01:03:03,000")
  })

  it("handles zero-padded seconds and milliseconds", () => {
    const shiftedTime = shiftTime("00:00:00,001", 0.999)
    expect(shiftedTime).toBe("00:00:01,000")
  })

})