import { createIntl } from "react-intl";

import { getGrantedRefundSuccessMessage } from "./getGrantedRefundSuccessMessage";

const intl = createIntl({ locale: "en", messages: {} });

describe("getGrantedRefundSuccessMessage", () => {
  it("includes the formatted refunded amount and the order number", () => {
    // Arrange
    const grantedRefundAmount = { amount: 24, currency: "USD" };

    // Act
    const result = getGrantedRefundSuccessMessage(intl, {
      orderNumber: "1042",
      grantedRefundAmount,
    });

    // Assert
    expect(result).toBe("Refund of $24.00 for order #1042 was granted");
  });

  it("falls back to the message without an amount when none is returned", () => {
    // Arrange
    const grantedRefundAmount = null;

    // Act
    const result = getGrantedRefundSuccessMessage(intl, {
      orderNumber: "1042",
      grantedRefundAmount,
    });

    // Assert
    expect(result).toBe("Refund for order #1042 was granted");
  });
});
